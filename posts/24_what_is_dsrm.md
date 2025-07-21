
# What is Directory Services Restore Mode (DSRM)?

## DSRM Explained
**DSRM** is a special boot mode for domain controllers used for repairing or restoring the Active Directory database.

## Key Features
- **Offline Repair**: Allows recovery operations without starting AD services.
- **Dedicated Password**: Set during DC promotion; used to log in when booting into DSRM.
- **Common Use Case**: Restore from a backup, perform authoritative restore.

Only domain controllers support DSRM, and it's a vital tool for disaster recovery.
