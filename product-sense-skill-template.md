# Product Sense & Customer Insights Skill (Template)

> A template for building an AI-assisted "product sense" skill that lets your team query centralized customer data across the entire customer lifecycle. Adapt the data sources, schemas, and query patterns to match your own data warehouse.

---

## Overview

This skill gives product, sales, and support teams a single interface to query real customer data and build product intuition. Instead of jumping between 6+ SaaS dashboards, team members ask questions in natural language and the AI agent translates them into SQL queries against your data warehouse.

## When to Use

Use this skill to build product sense by querying real customer data across the entire customer lifecycle:

- **Feature adoption & usage**: Understanding which features are used, by whom, and how often
- **Customer feedback**: Discovering what customers say about your product, their pain points, and feature requests
- **User behavior**: Analyzing how users interact with the product, navigation patterns, and drop-off points
- **Customer journey**: Mapping the path from website visit -> signup -> product adoption -> expansion
- **Support patterns**: Identifying common issues, response times, and customer satisfaction
- **Sales insights**: Understanding objections, pricing reactions, and what wins/loses deals
- **Competitive intelligence**: Researching what customers say about competitors and alternative solutions
- **Marketing effectiveness**: Measuring campaign performance, email engagement, and conversion rates

## Architecture

The key design decision is to **centralize all SaaS tool data into a single data warehouse** (e.g., BigQuery, Snowflake, Redshift) so the AI agent only needs one set of credentials and one query language.

```
┌──────────────┐
│  Gong        │──┐
│  HubSpot     │──┤
│  Pendo       │──┤   ETL / Sync        ┌──────────────────┐
│  Salesforce  │──┼──────────────────────│  Data Warehouse  │
│  Fullstory   │──┤   (Fivetran, Airbyte,│  (BigQuery, etc) │
│  GA4         │──┤    custom, etc.)     └────────┬─────────┘
│  Support Tool│──┘                               │
                                                  │  SQL Queries
                                                  │
                                          ┌───────▼─────────┐
                                          │  AI Agent Skill  │
                                          │  (this template) │
                                          └─────────────────┘
```

### Why This Works

- **Single auth**: Agent authenticates to your warehouse once (e.g., `gcloud auth`, Snowflake creds)
- **No API keys needed per tool**: All data is already synced to the warehouse
- **Consistent SQL**: One query language across all sources
- **Safe**: Queries are read-only against synced copies, not production SaaS APIs

## Prerequisites

- CLI access to your data warehouse (e.g., `bq` CLI for BigQuery, `snowsql` for Snowflake)
- Authenticated credentials for the warehouse
- Data synced from your SaaS tools (via Fivetran, Airbyte, Stitch, or custom ETL)
- Basic SQL knowledge

## Safety & Scope

This skill queries production customer data. Queries should be **suggestion-only** by default:
- Agent provides query examples and patterns
- User reviews and executes queries manually
- Always write large outputs to a temp directory for analysis

## Recommended Data Sources

Pick the sources that matter for your business. Here are common ones:

| Category | Example Tools | What You Get |
|----------|---------------|--------------|
| Sales Conversations | Gong, Chorus, Clari | Call transcripts, talk tracks, objection tracking |
| CRM / Marketing | HubSpot, Marketo, Pardot | Contacts, companies, deals, email engagement |
| Product Analytics | Pendo, Amplitude, Mixpanel | Feature usage, adoption metrics, user journeys |
| Session Replay | FullStory, Hotjar, LogRocket | User behavior events, session recordings metadata |
| Sales Pipeline | Salesforce, HubSpot CRM | Accounts, leads, opportunities, win/loss data |
| Website Analytics | GA4, Adobe Analytics | Traffic sources, conversion funnels, page views |
| Support | Zendesk, Intercom, Pylon | Tickets, response times, customer satisfaction |

## Quick Start

### Basic Query Pattern

```bash
# Adapt to your warehouse CLI and project/database
<your-cli> query '
SELECT ...
FROM <your_project>.<dataset>.<table>
WHERE ...
LIMIT 100
'
```

### Save Large Results

Always write large outputs to a temp directory:

```bash
<your-cli> query --format=json '
SELECT ...
FROM <your_project>.<dataset>.<table>
WHERE ...
' > ./tmp/$(whoami)-$(date +%s)-<label>.json

# Analyze with jq, grep, or rg
jq '.[] | select(.field == "value")' ./tmp/<file>.json
```

## Example Query Patterns

### 1. Search Sales Conversations for Customer Feedback

```sql
-- Find customer mentions of a specific topic in call transcripts
SELECT
  c.call_id,
  c.call_date,
  t.speaker_name,
  t.text
FROM <your_project>.sales_conversations.calls c
JOIN <your_project>.sales_conversations.transcripts t
  ON c.call_id = t.call_id
WHERE LOWER(t.text) LIKE '%<topic>%'
  AND c.call_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
  AND t.is_customer = true
ORDER BY c.call_date DESC
LIMIT 50
```

### 2. Feature Adoption Analysis

```sql
-- Most used features in the last 30 days
SELECT
  feature_id,
  SUM(event_count) as total_events,
  COUNT(DISTINCT account_id) as unique_accounts,
  COUNT(DISTINCT day) as days_active
FROM <your_project>.product_analytics.feature_events_daily
WHERE day >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
GROUP BY feature_id
ORDER BY total_events DESC
LIMIT 100
```

### 3. Customer Objections in Sales Calls

```sql
-- Common objections tracked in sales conversations
SELECT
  t.name as objection_type,
  COUNT(DISTINCT c.call_id) as call_count
FROM <your_project>.sales_conversations.calls c
JOIN <your_project>.sales_conversations.call_trackers ct
  ON c.call_id = ct.call_id
JOIN <your_project>.sales_conversations.trackers t
  ON ct.tracker_id = t.id
WHERE t.name LIKE '%objection%'
  AND c.call_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
GROUP BY t.name
ORDER BY call_count DESC
```

### 4. Recent Support Issues

```sql
-- Recent support tickets with resolution metrics
SELECT
  i.id,
  i.title,
  i.description,
  i.status,
  i.priority,
  i.created_at,
  r.first_response_time_seconds,
  r.resolution_time_seconds
FROM <your_project>.support.issues i
LEFT JOIN <your_project>.support.response_metrics r
  ON i.id = r.issue_id
WHERE i.created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 14 DAY)
ORDER BY i.created_at DESC
LIMIT 50
```

### 5. Pipeline Analysis by Source

```sql
-- Opportunities grouped by lead source
SELECT
  lead_source,
  COUNT(*) as opportunity_count,
  SUM(amount) as total_amount,
  AVG(amount) as avg_deal_size,
  COUNTIF(is_won) as won_count,
  COUNTIF(is_closed AND NOT is_won) as lost_count
FROM <your_project>.crm.opportunities
WHERE created_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
GROUP BY lead_source
ORDER BY total_amount DESC
```

### 6. Email Campaign Performance

```sql
-- Email engagement by campaign
SELECT
  campaign_id,
  COUNTIF(event_type = 'SENT') as sent,
  COUNTIF(event_type = 'OPEN') as opens,
  COUNTIF(event_type = 'CLICK') as clicks,
  ROUND(COUNTIF(event_type = 'OPEN') * 100.0
    / NULLIF(COUNTIF(event_type = 'SENT'), 0), 2) as open_rate,
  ROUND(COUNTIF(event_type = 'CLICK') * 100.0
    / NULLIF(COUNTIF(event_type = 'OPEN'), 0), 2) as click_through_rate
FROM <your_project>.marketing.email_events
WHERE created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
GROUP BY campaign_id
ORDER BY sent DESC
LIMIT 50
```

### 7. User Behavior Patterns

```sql
-- Most common user actions in product (from session replay / analytics)
SELECT
  event_type,
  COUNT(*) as event_count,
  COUNT(DISTINCT user_id) as unique_users
FROM <your_project>.product_analytics.user_events
WHERE event_timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
GROUP BY event_type
ORDER BY event_count DESC
LIMIT 50
```

## Building Product Sense: Cross-Dataset Analysis

The real power comes from combining multiple data sources. Here are proven patterns:

### Validate Feature Requests
- **Sales Conversations**: Find all calls where customers request feature X
- **Product Analytics**: Check if similar existing features are actually being used
- **Support**: See if lack of feature X drives support tickets
- **Insight**: Prioritize requests from active users, not just loud voices

### Understand Feature Adoption
- **Product Analytics**: Identify low-adoption features
- **Session Replay**: Watch session recordings to see why users struggle
- **Sales Conversations**: Listen to sales calls to understand if the feature is being sold correctly
- **Support**: Check if the feature generates support issues
- **Insight**: Is it a marketing problem, UX problem, or the feature itself?

### Customer Health Scoring
- **Product Analytics**: Declining usage or lack of key feature adoption
- **Marketing/CRM**: Reduced email engagement or lack of activity
- **Support**: Spike in support tickets or declining CSAT
- **Sales Conversations**: Mentions of competitors or churn indicators in calls
- **Insight**: Proactively identify at-risk accounts before they churn

### Competitive Intelligence
- **Sales Conversations**: Search transcripts for competitor names and why customers chose them
- **CRM**: Analyze win/loss data by competitor
- **Support**: See if customers mention competitors in support context
- **Insight**: Understand your positioning gaps and competitive weaknesses

### Pricing & Packaging Strategy
- **Sales Conversations**: Analyze pricing objections and what thresholds trigger pushback
- **CRM**: Look at deal sizes, discounts, and win rates by segment
- **Marketing**: Track how pricing page engagement correlates with conversion
- **Insight**: Data-driven pricing changes and packaging decisions

### User Journey Optimization
- **Website Analytics**: Website entry points and navigation patterns
- **Marketing/CRM**: Form fills, email engagement, MQL/SQL progression
- **Session Replay**: First-session behavior in product
- **Product Analytics**: Time-to-first-value and feature adoption curve
- **Insight**: Identify and remove friction points in onboarding

### Product-Market Fit Signals
- **Sales Conversations**: Listen for language like "can't live without", "game changer", emotional reactions
- **Product Analytics**: Look for power users with daily usage and deep feature adoption
- **Marketing/CRM**: Track customer expansion and upsell patterns
- **CRM**: Analyze sales cycle length and close rates over time
- **Insight**: Understand which segments/use cases have true product-market fit

### Support-Driven Product Improvements
- **Support**: Cluster common support issues by topic
- **Session Replay**: Watch user sessions leading up to support ticket creation
- **Sales Conversations**: See if sales is setting wrong expectations
- **Product Analytics**: Check if certain features/pages correlate with support volume
- **Insight**: Prioritize UX improvements and self-service documentation

## Best Practices

1. **Use date filters** - These tables are large. Always filter by date to avoid slow/expensive queries
2. **Limit results** - Start with `LIMIT 100` for exploration, increase as needed
3. **Write to temp files** - Large result sets should be written to files, then analyzed with `jq`/`grep`/`rg`
4. **Join sparingly** - Start with single tables, add joins only when needed
5. **Check schemas first** - Preview table schemas before querying
6. **Select specific columns** - Use `SELECT col1, col2` instead of `SELECT *`
7. **Apply filters before joins** - Reduce data early for better performance

## Adapting This Template

To set this up for your company:

1. **Choose your data warehouse**: BigQuery, Snowflake, Redshift, Databricks, etc.
2. **Set up data syncs**: Use Fivetran, Airbyte, Stitch, or custom ETL to sync your SaaS tools into the warehouse
3. **Map your schemas**: Replace the `<your_project>.<dataset>.<table>` placeholders with your actual table paths
4. **Document your schemas**: Create a reference doc listing every table, its columns, types, and descriptions
5. **Add query patterns**: Write example queries specific to your data and common questions your team asks
6. **Set safety guardrails**: Decide whether the agent executes queries directly or only suggests them
7. **Iterate**: As your team uses the skill, add new query patterns for frequently asked questions

## Schema Reference Template

For each data source, document your tables like this:

```
### <Tool Name> (<Category>)

#### <dataset>.<table_name>

<Brief description of what this table contains.>

| Column | Type | Description |
|--------|------|-------------|
| `id` | STRING | Unique identifier |
| `name` | STRING | Display name |
| `created_at` | TIMESTAMP | Created timestamp |
| ... | ... | ... |

**Tips:**
- Common filters: ...
- Useful joins: ...
- Watch out for: ...
```

## Query Performance Tips

### Date Partitioning
Many warehouse tables are partitioned by date. Use partition filters for performance:

```sql
-- Good: Uses partition filter
SELECT * FROM <table>
WHERE event_date = '2026-02-09'

-- Bad: Scans all partitions
SELECT * FROM <table>
WHERE event_timestamp > TIMESTAMP('2026-02-09')
```

### Cost Optimization
- Always use `LIMIT` during exploration
- Select only the columns you need
- Apply filters before joins
- Use table previews to understand schema before querying

### Data Freshness
Document how often each source syncs so users know what to expect:
- **Sales Conversations**: e.g., daily sync
- **CRM**: e.g., every 4-6 hours
- **Product Analytics**: e.g., daily batch
- **Session Replay**: e.g., near real-time
- **Website Analytics**: e.g., daily (previous day by morning)
