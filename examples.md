---
title: Job Script Examples
layout: default
---

# Job Submission Examples

## 1. CPU Job

```bash
#!/bin/bash
#$ -N cpu_job
#$ -pe smp 4
#$ -cwd
#$ -l h_rt=01:00:00

python my_script.py

