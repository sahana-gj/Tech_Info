# What is Active Directory Schema?

## Schema Overview
The **Active Directory Schema** defines the structure of the AD database, including object classes and their attributes.

## Key Concepts
- **Object Classes**: Define types of objects (like users, computers, groups).
- **Attributes**: Define the data stored in each object (e.g., `givenName`, `sAMAccountName`).
- **Schema Master Role**: A special domain controller holds the schema master FSMO role, which is the only one that can update the schema.

Schema changes are rare but critical, often occurring during software installations that extend AD functionality.
