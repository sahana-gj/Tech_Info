
# What is Time Synchronization in Active Directory?

## Importance of Time Sync
**Time Synchronization** ensures that all systems in an AD environment have the same time, which is essential for Kerberos authentication.

## How it Works
- **PDC Emulator as Time Source**: All domain controllers and clients sync time with it.
- **NTP Integration**: The PDC typically syncs with an external NTP server.
- **Kerberos Dependency**: Time differences over 5 minutes can cause logon failures.

Accurate timekeeping is critical for authentication, replication, and logging.
