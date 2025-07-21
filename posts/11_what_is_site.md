# What is a Site in Active Directory?

## Understanding Sites
An **Active Directory Site** represents a physical network location (usually a subnet) that is used to control network traffic and AD replication.

## Purpose of Sites
- **Control Replication Traffic**: Sites optimize replication by ensuring that domain controllers within the same site replicate more frequently than those in different sites.
- **Authentication and Service Location**: Clients locate the nearest domain controller through their assigned site, improving login speed and performance.
- **Defined by Subnets**: Each site is associated with one or more IP subnets to define its boundaries.

Sites are especially useful in large organizations with multiple physical locations.
