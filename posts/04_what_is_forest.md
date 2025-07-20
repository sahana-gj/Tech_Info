


## Understanding Forests
In Active Directory, a **forest** is the top-most container in the AD hierarchy and consists of one or more domains that share a common schema, configuration, and global catalog. A forest represents a complete instance of Active Directory.

## Characteristics of a Forest
- **Multiple Domains**: A forest can contain multiple domains. These domains share the same schema and are connected by trust relationships.
- **Common Schema**: All domains in a forest share the same schema, which defines the types of objects that can be created in AD (e.g., users, groups, and computers).
- **Global Catalog**: A global catalog server is used to store partial information about all objects in the forest, which facilitates quick searches for objects across multiple domains.

A forest is typically used when an organization needs to separate domains for administrative or business reasons but still wants them to work together.
