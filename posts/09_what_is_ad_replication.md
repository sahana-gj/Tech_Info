
# What is AD Replication?

## Understanding AD Replication
**Active Directory Replication** is the process by which changes made to one domain controller in an AD environment are propagated to other domain controllers. It ensures consistency and availability of data across the network.

## Types of Replication
- **Intra-Site Replication**: Occurs within a single site, typically very fast due to proximity.
- **Inter-Site Replication**: Occurs between different physical sites, and it can be scheduled to minimize network traffic.
- **Multi-Master Replication**: In AD, every domain controller is a master and can make changes. These changes are replicated to all other DCs to maintain consistency.
