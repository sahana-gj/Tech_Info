
# What is DNS in Active Directory?

## Importance of DNS in AD
**DNS (Domain Name System)** is an integral part of Active Directory because it is used to resolve domain names into IP addresses, allowing domain controllers to locate each other and clients to locate services such as email and file servers.

## DNS and Active Directory Integration
- **Domain Controller Location**: Active Directory relies on DNS to locate domain controllers, ensuring that client computers can authenticate with the domain.
- **SRV Records**: Special DNS records known as SRV records are used to point to services like LDAP and Kerberos within Active Directory.

Without DNS, Active Directory would not function as it relies heavily on it for various services like replication, authentication, and locating network resources.
