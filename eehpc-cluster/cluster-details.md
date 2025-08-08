---
layout: default
title: Cluster Details
parent: EEHPC Cluster
has_children: false
nav_order: 1
---

# EEHPC Cluster Details

# GPU Resource Availability

| **Node**      | **Number of GPUs** | **GPU Memory per GPU** |
|---------------|:------------------:|:----------------------:|
| compute-0-0   |         2          |        16 GB           |
| compute-0-1   |         2          |        16 GB           |
| compute-0-2   |         2          |        16 GB           |
| compute-0-3   |         2          |        16 GB           |
| compute-0-4   |         2          |        16 GB           |
| compute-0-6   |         3          |      11–16 GB          |
| compute-0-8   |         2          |        24 GB           |
| compute-0-5   |         3          |        48 GB           |
| compute-0-7   |         2          |        48 GB           |
| compute-0-9   |         3          |        48 GB           |

# Queue and GPU Resource Usage

| **Queue Name**     | **GPU Memory Eligibility** | **Max Jobs per User** | **Max Time Limit** | **GPU Usage Allowed** |
|--------------------|:-------------------------:|:--------------------:|:------------------:|:---------------------:|
| all.q (default)    | None                      | N/A                  | N/A                | No                    |
| short-gpu.q        | Up to 24 GB               | 6                    | 4 hours            | Yes                   |
| gpu.q              | Up to 16 GB               | 6                    | 2 days             | Yes                   |
| med-gpu.q          | 24–48 GB                  | 3                    | 4 days             | Yes                   |
| long-gpu.q         | 48 GB                     | 3                    | 7 days             | Yes                   |

> **Note:**  
> By default, `all.q` is launched and it will **not** use GPU resources.

---

> **Warning**
>
> Any user who violates the rules puts all other user jobs under crash-risk.  
> When identified, we will follow a two-tier warning system:
> - **Yellow flag:** Stern warning  
> - **Red flag:** User privileges removed or restricted

---
