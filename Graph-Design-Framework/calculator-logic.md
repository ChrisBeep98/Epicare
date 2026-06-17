---
description: Lógica matemática y variables detrás de la Calculadora de ROI de GO AMS.
---

# Lógica de la Calculadora Home (GO AMS)

Este documento detalla el modelo matemático exacto implementado en `src/components/landing-v2/calculator/HomeCalculator.tsx`. La calculadora utiliza principios de **economía del comportamiento** para demostrar de forma tangible cuánto dinero pierde un negocio por deficiencias en su atención al cliente, y cómo GO AMS genera un Retorno de Inversión (ROI) positivo.

---

## 1. Variables de Entrada (Input del Usuario)

Estas variables son ingresadas por el usuario en el **Paso 1 (Tu Negocio)** a través de los sliders, o pre-pobladas al seleccionar un tipo de negocio (Servicios, E-commerce, Agencia, etc.).

| Variable | Tipo | Descripción |
| :--- | :--- | :--- |
| `dailyMsgs` | Número | Total de mensajes recibidos por día en todos los canales. |
| `responseTime` | Minutos | Tiempo promedio que tarda el equipo humano en responder. |
| `clientValue` | Dólares | Ganancia promedio obtenida por cada venta o cliente cerrado. |
| `hoursManual` | Horas/Semana| Tiempo semanal invertido por el dueño o equipo simplemente respondiendo chats. |

*Cálculo derivado base:*
- `monthlyMsgs` = `dailyMsgs * 30` (Aproximación de volumen mensual).

---

## 2. Constantes Internas del Modelo

El modelo depende de variables internas fijas para estimar tasas de conversión y valor del tiempo humano.

- **`convRate` (Tasa de Conversión) = `0.12` (12%)**
  Se asume que de los leads "viables" que contactan al negocio, el 12% termina comprando o agendando.
- **`hourlyValue` (Valor de la Hora) = `$50`**
  Se estima el tiempo administrativo del dueño / equipo en $50 USD por hora.
- **`flowCost` (Costo del SaaS) = `$297` / mes**
  Precio fijo de la suscripción base de GO AMS para el cálculo del ROI.

---

## 3. Fórmulas de Pérdida "Dolor" (Paso 2)

La calculadora mide la pérdida de dinero (`totalPain`) mensual dividiéndola en 4 métricas específicas. 

### A. Mensajes sin contestar (`lostRevenue`)
Penalización progresiva: A mayor tiempo de respuesta, mayor ratio de olvido.
- `missedRate` = Mínimo `0.2` (20% base de pérdida) y aumenta según el `responseTime` hasta un tope del `65%`.
- `missedMsgs` = `monthlyMsgs * missedRate`
- `lostClients` = `missedMsgs * convRate`
- **Métrica final:** `lostRevenue = lostClients * clientValue`

### B. Silencio fuera de horario (`afterHoursLost`)
Mide la pérdida por leads que escriben de noche o fines de semana.
- Se asume que el **30%** de los mensajes totales llegan fuera de horario.
- Se penaliza este grupo con un **50% del valor completo**, asumiendo que al día siguiente la persona ya se "enfrió" o compró a alguien más.
- **Métrica final:** `afterHoursLost = (monthlyMsgs * 0.3) * convRate * clientValue * 0.5`

### C. Demoras que matan ventas (`slowPenalty`)
Aplicado a los leads que **SÍ** se alcanzan a contestar pero tarde.
- Del resto de mensajes no olvidados (`1 - missedRate`), se calcula que un **8%** de los clientes se pierden a manos de la competencia debido a la impaciencia.
- **Métrica final:** `slowPenalty = monthlyMsgs * (1 - missedRate) * 0.08 * clientValue`

### D. Tu tiempo quemado (`monthlyTimeCost`)
El costo literal del tiempo humano desperdiciado siendo "secretari@".
- **Métrica final:** `hoursManual * 4 (semanas) * hourlyValue`

### 📉 Costo Real Total
> `totalPain = lostRevenue + afterHoursLost + slowPenalty + monthlyTimeCost`

---

## 4. Fórmulas de Recuperación con GO AMS (Paso 3)

El escenario positivo calcula cuánto salva o genera GO AMS. No repara el 100% mágico de las pérdidas (para no sonar irrealista y falso), sino que aplica márgenes lógicos de éxito.

- **`recoveredRevenue`:** Recupera el **65%** de los clientes perdidos por mensajes ignorados.
- **`afterHoursRecovered`:** "Despierto a las 3 am" salva el **85%** de la pérdida nocturna.
- **`slowPenaltyRecovered`:** Por contestar en `<1 min`, se rescata el **90%** de clientes impacientes absorbidos por la competencia.
- **`timeSavedValue`:** Libera el **80%** de las horas muertas del equipo/dueño para tareas directivas.

### 🚀 Resultados de Valor y ROI
- **Valor Mensual Generado (`totalFlowValue`):** Suma de todo el dinero y tiempo ahorrado por Flow.
- **Costo Diario de Flow:** `flowCost / 30`.
- **ROI:** `totalFlowValue / flowCost` (Multiplicador directo "x veces").
- **Beneficio 1er Año (`yearBenefit`):** `(totalFlowValue - flowCost) * 12`.
