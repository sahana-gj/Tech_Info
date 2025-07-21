
# What is the RID Master in Active Directory?

## RID Master Role
The **Relative Identifier (RID) Master** is a domain-level FSMO role that ensures each object created in AD has a unique security identifier (SID).

## Responsibilities
- **RID Pool Distribution**: Assigns RID blocks to other DCs.
- **Uniqueness Guarantee**: Ensures no SID duplication across the domain.
- **One per Domain**: Each domain has one RID master.

The RID Master is crucial for identity management in AD.
