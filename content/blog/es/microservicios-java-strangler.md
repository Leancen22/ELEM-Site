---
title: "Del monolito a microservicios sin parar el negocio"
excerpt: "El patrón strangler explicado con un caso real de migración de un core bancario en Java a una arquitectura event-driven."
category: "Backend"
author: "Equipo ELEM"
date: "2026-05-12"
accent: "from-orange-500 to-rose-600"
image: "/blog/cover-2.svg"
featured: true
---

Reescribir un sistema crítico de golpe es la receta del desastre. El patrón strangler propone lo contrario: extraer capacidades de forma incremental hasta que el monolito deja de ser necesario.

## Empezar por los bordes

Identificamos los dominios con menos acoplamiento y mayor valor, y los extraemos primero. Cada microservicio se despliega de forma independiente, con su propio ciclo de vida.

## Eventos como columna vertebral

Kafka actúa como sistema nervioso: los servicios se comunican de forma asíncrona, lo que reduce el acoplamiento y habilita auditoría y resiliencia.
