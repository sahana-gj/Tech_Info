

## Role of a Domain Controller
A **Domain Controller (DC)** is a server that is responsible for authenticating users, enforcing security policies, and storing a copy of the Active Directory database. It ensures that users and computers within a domain can log in and access network resources securely.

## Core Responsibilities
- **Authentication**: DCs are responsible for validating user credentials when logging in to the network.
- **Replication**: Changes made to AD data, such as user accounts or group memberships, are replicated across multiple domain controllers to maintain consistency.
- **Group Policy Enforcement**: DCs also enforce Group Policies, which control user and computer settings within the domain.

A domain can have multiple DCs to ensure redundancy and availability, especially in larger networks where high availability and fault tolerance are crucial.
