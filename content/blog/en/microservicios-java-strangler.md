---
title: "From monolith to microservices without stopping the business"
excerpt: "The strangler pattern explained with a real case of migrating a Java banking core to an event-driven architecture."
category: "Backend"
author: "ELEM Team"
date: "2026-05-12"
accent: "from-orange-500 to-rose-600"
image: "/blog/cover-2.svg"
featured: true
---

Rewriting a critical system all at once is a recipe for disaster. The strangler pattern proposes the opposite: extract capabilities incrementally until the monolith is no longer needed.

## Start at the edges

We identify the domains with the least coupling and the most value, and extract them first. Each microservice deploys independently, with its own lifecycle.

## Events as the backbone

Kafka acts as the nervous system: services communicate asynchronously, which reduces coupling and enables auditing and resilience.
