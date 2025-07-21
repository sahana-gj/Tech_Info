
# What is the PDC Emulator in Active Directory?

## Role of the PDC Emulator
The **PDC Emulator** is a domain-level FSMO role that acts as the authoritative time source and handles password updates and logon failures.

## Key Functions
- **Time Synchronization**: Keeps time synced across all domain members.
- **Password Management**: Immediate replication of password changes.
- **Compatibility Support**: Acts like a Windows NT PDC for legacy systems.

The PDC Emulator plays a vital role in domain health and user logon operations.
