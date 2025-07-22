## RPC anonymous Netlogon protocol

This document outlines the security hardening changes for the Microsoft RPC Netlogon protocol (MC1113050) and their impact on Active Directory Rejects/block. The July 2025 Windows security update blocks anonymous RPC requests to domain controllers, affecting interoperability with services like Samba.

---

## Key Dates

- **July 2025:** Security update released for Windows Server 2008 R2 through 2022.
- **February 2025:** Update included for Windows Server 2025.

---

## Impact

- Domain controllers will reject anonymous Netlogon RPC requests.
- May disrupt third-party services (e.g., Samba) that rely on anonymous RPC.
- Samba servers using `idmap backend = ad` will be affected.

---

## Preparation Steps

1. **Review dependencies** on anonymous Netlogon RPC requests.
2. **Consult Samba release notes** for compatibility guidance.
3. **Test updates** in a staging environment before deployment.

---

## Additional Resources

- [Windows Server 2025 KB Article](https://support.microsoft.com/help/5051987)
- [Windows Server 2022 KB Article](https://support.microsoft.com/help/5062572)
- [Windows Server 2012 R2 KB Article](https://support.microsoft.com/help/5062597)
- [Windows Server 2012 KB Article](https://support.microsoft.com/help/5062592)
- [Windows Server 2008 R2 SP1 KB Articles](https://support.microsoft.com/help/5062632), [5062619](https://support.microsoft.com/help/5062619)
- [Windows Server 2008 SP2 KB Articles](https://support.microsoft.com/help/5062624), [5062618](https://support.microsoft.com/help/5062618)
- [Samba Bugzilla – Bug 15876](https://bugzilla.samba.org/show_bug.cgi?id=15876)

---

## Notes

- No workaround available at the domain controller level.
- Samba servers not using the `ad` backend are not impacted.
- Storage and non-Windows systems may also be affected.

---

## Recommended Actions

1. **Enable Netlogon auditing** on all Domain Controllers.
2. **Review Event Viewer logs** for affected systems.
3. **Coordinate with application teams** to validate dependencies.



# 🔒 Netlogon Debug Logging vs. NTLM Auditing (`AuditNTLMInDomain`)

This document compares `Netlogon debug logging (DBFlag = 0x2080FFFF)` with `AuditNTLMInDomain = 7` for the purpose of auditing and troubleshooting Netlogon and NTLM usage in Active Directory environments.

---

## 📊 Comparison Table

| Feature | **Netlogon Debug Logging**<br>(`DBFlag = 0x2080FFFF`) | **NTLM Auditing**<br>(`AuditNTLMInDomain = 7`) |
|--------|---------------------------|---------------------------|
| **Purpose** | Deep diagnostic logging for Netlogon processes | Event-based auditing of NTLM authentication, especially anonymous usage |
| **Registry Path** | `HKLM\SYSTEM\CurrentControlSet\Services\Netlogon\Parameters\DBFlag` | `HKLM\SYSTEM\CurrentControlSet\Services\Netlogon\Parameters\AuditNTLMInDomain` |
| **Type** | Verbose debug file logging | Structured event logging |
| **Log Location** | `C:\Windows\Debug\Netlogon.log` | Event Viewer → **Applications and Services Logs → Microsoft → Windows → NTLM → Operational** |
| **Output Format** | Plain text (hard to parse) | Structured XML event logs (filterable) |
| **Event IDs** | Not applicable (file log only) | `4001`, `4002`, `4003`, `4004`<br>🔴 **4004 = Anonymous Netlogon RPC** |
| **Useful For** | Troubleshooting secure channel, replication, or Netlogon RPC failures | Auditing NTLM usage, detecting anonymous Netlogon RPC (critical for July 2025 update) |
| **Performance Impact** | Moderate – writes lots of data to disk | Minimal |
| **Recommended in Production?** | ❌ Use only for **short-term troubleshooting** | ✅ Yes, for ongoing monitoring |
| **Can be queried centrally?** | ❌ No (manual parsing) | ✅ Yes (PowerShell, SIEM, event forwarding) |
| **Required for July 2025 Update?** | ❌ Not required | ✅ **Yes**, to detect and prepare for anonymous RPC blocks |

---

## ✅ Recommendations

| Scenario | Action |
|----------|--------|
| Preparing for July 2025 update to block anonymous Netlogon RPC | ✅ Enable `AuditNTLMInDomain = 7` |
| Investigating trust/authentication/replication issues | ✅ Temporarily enable `DBFlag = 0x2080FFFF` |
| Long-term production monitoring | ✅ Use `AuditNTLMInDomain = 7` only |
| Short-term deep troubleshooting | ✅ Use `DBFlag = 0x2080FFFF`, then revert to `0` |

---

## ⚙️ Commands Summary

### ✅ Enable NTLM Auditing (Recommended for July 2025 Prep)
```powershell
Set-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Services\Netlogon\Parameters' `
  -Name 'AuditNTLMInDomain' -Value 7 -Type DWord
Restart-Service Netlogon
```

### 🛠️ Enable Netlogon Debug Logging (Use Temporarily)
```powershell
Set-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Services\Netlogon\Parameters' `
  -Name 'DBFlag' -Value 0x2080FFFF -Type DWord
Restart-Service Netlogon
```

### 🔁 Disable Netlogon Debug Logging
```powershell
Set-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Services\Netlogon\Parameters' `
  -Name 'DBFlag' -Value 0
Restart-Service Netlogon
```

---

## 📂 File Locations Summary

| File/Log | Path |
|----------|------|
| Netlogon Debug Log | `C:\Windows\Debug\Netlogon.log` |
| NTLM Audit Log | `Event Viewer → Microsoft → Windows → NTLM → Operational` |

---

## 📌 Notes

- NTLM Auditing (`AuditNTLMInDomain = 7`) is **essential** for identifying **anonymous Netlogon RPC usage**, which will be blocked by Microsoft starting **July 2025**.
- Debug logging (`DBFlag`) is helpful but **not a substitute** for audit logging.
- Always disable `DBFlag` after troubleshooting to avoid disk I/O performance issues.


### Check Auditing option
```powershell

$DCs = Get-ADDomainController -Filter *

foreach ($dc in $DCs) {
    $status = Invoke-Command -ComputerName $dc.HostName -ScriptBlock {
        try {
            $auditStatus = Get-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Services\Netlogon\Parameters' -Name 'AuditNTLMInDomain' -ErrorAction SilentlyContinue
            return @{
                ComputerName = $env:COMPUTERNAME
                NetlogonAuditing = if ($auditStatus.AuditNTLMInDomain -eq 7) { "Enabled" } else { "Disabled or Not Set" }
            }
        } catch {
            return @{
                ComputerName = $env:COMPUTERNAME
                NetlogonAuditing = "Error Reading Registry"
            }
        }
    }

    Write-Output "$($status.ComputerName): Netlogon Auditing - $($status.NetlogonAuditing)"
}
 
```

### Disable Auditing option
```powershell
$DCs = Get-ADDomainController -Filter *

foreach ($dc in $DCs) {
    Invoke-Command -ComputerName $dc.HostName -ScriptBlock {
        New-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Services\Netlogon\Parameters' `
            -Name 'AuditNTLMInDomain' -Value 0 -PropertyType DWORD -Force

        Write-Output "$env:COMPUTERNAME: Netlogon Auditing Disabled"
    }
}
# Output completion message
Write-Host "Netlogon auditing has been disabled on all domain controllers." -ForegroundColor Green 


```

### Enable Auditing option
```powershell

Import-Module ActiveDirectory
$DCs = Get-ADDomainController -Filter *

foreach ($dc in $DCs) {
    Invoke-Command -ComputerName $dc.HostName -ScriptBlock {
        New-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Services\Netlogon\Parameters' `
            -Name 'AuditNTLMInDomain' -Value 7 -PropertyType DWORD -Force

        Write-Output "$env:COMPUTERNAME: Netlogon Auditing Enabled"
    }
}
 

```

### Generate Auditing Reports
```powershell

Import-Module ActiveDirectory

# Get the list of all DCs
$DCs = Get-ADDomainController -Filter *

# Define time filter for the last 24 hours
$since = (Get-Date).AddHours(-24)

# Event IDs to track
$eventIDs = @(4001, 4002, 4003, 4004)

# Collect results
$allResults = foreach ($dc in $DCs) {
    Write-Host "Querying $($dc.HostName)..." -ForegroundColor Cyan

    try {
        Invoke-Command -ComputerName $dc.HostName -ScriptBlock {
            param($since, $eventIDs)

            # Check if the NTLM Operational log is enabled
            $logName = 'Microsoft-Windows-NTLM/Operational'
            $logStatus = wevtutil get-log $logName

            if ($logStatus -match 'enabled: true') {
                Get-WinEvent -FilterHashtable @{
                    LogName = $logName
                    StartTime = $since
                    Id = $eventIDs
                } | Select-Object TimeCreated, Id, MachineName, Message
            } else {
                Write-Warning "$logName is not enabled on $env:COMPUTERNAME"
            }
        } -ArgumentList $since, $eventIDs
    } catch {
        Write-Warning "Failed to query $($dc.HostName): $_"
    }
}

# Output results in table
$allResults | Format-Table -AutoSize

# Optional: Export to CSV
$allResults | Export-Csv "C:\Temp\NTLMAuditEvents_24hrs.csv" -NoTypeInformation

```