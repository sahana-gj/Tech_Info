
# What is the Schema Master in Active Directory?

## FSMO Role Overview
The **Schema Master** is one of the five FSMO (Flexible Single Master Operations) roles in Active Directory. It controls all updates and modifications to the schema.

## Key Functions
- **Schema Modifications**: Required during AD extensions (e.g., Exchange install).
- **Uniqueness**: Only one schema master per forest.
- **Change Replication**: After modification, updates replicate to all DCs.

It’s rarely used but critically important when schema changes are necessary.
