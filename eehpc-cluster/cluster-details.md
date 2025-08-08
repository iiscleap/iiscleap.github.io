---
layout: default
title: Cluster Details
parent: EEHPC Cluster
has_children: false
nav_order: 1
---

# EEHPC Cluster Details
The EEHPC Cluster is hosted by LEAP Lab in the Electrical Engineering building, Indian Institute of Science (IISc). 
![EEHPC Cluster Layout](../images/eehpc_layout.png)

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

# Disk Storage Details

- We now have **four disk spaces**:  
  `/export` (roughly equivalent to `/home`), `/data1/`, `/data2/`, and `/data3/`  
  with approximately **51 TB**, **28 TB**, **28 TB**, and **16 TB** of storage, respectively.

- The **data read/write speed hierarchy** is:  
  `/export` > `/data1/` » `/data2/` ~ `/data3/`

- Your **primary working directory** should be `/home/` (`/export`),  
  as it offers the **largest storage** and **fastest speed**.

- Use `/data2/` and `/data3/` for **large, infrequently used files**.  
  Move inactive data out of `/home/` to these locations.

- The **exact usage guidelines** for `/data1/`, `/data2/`, and `/data3/`  
  will be shared soon. Access to these directories will be **granted on request**,  
  based on your need for additional storage.

# Virtual Environments

- A **common base conda environment** should automatically be visible when you log in.  
  If you don’t see `'base'` next to your username after login, please contact the admin.

- For **GPU jobs**, a pre-configured environment named `pytorch2` is available.  
  Use the following command:
  ```bash
  conda activate pytorch2

# Shared Storage Spaces

To avoid redundancy and ensure efficient use of disk space, the following **shared directories** have been set up for common use across users:

1. **Datasets Directory**  
   Store all datasets in the shared location:  
   `/home/leapers/data`

2. **Feature Storage**  
   Extracted features should be stored in:  
   `/home/leapers/features`

3. **HuggingFace Cache**  
   HuggingFace model weights are now automatically stored in:  
   `/home/leapers`  
   > You do not need to change any settings — this is handled automatically.

4. **Model Weights**  
   Your own trained model weights should be saved in:  
   `/home/leapers/weights`

---

With the above shared spaces in place, your **personal `/home/username/` directory** should be reserved only for:
- Code
- Logs
- A few intermediate results

Please avoid storing large datasets or model weights in your home directory.

---

> **Warning**
>
> Any user who violates the rules puts all other user jobs under crash-risk.  
> When identified, we will follow a two-tier warning system:
> - **Yellow flag:** Stern warning  
> - **Red flag:** User privileges removed or restricted

---
