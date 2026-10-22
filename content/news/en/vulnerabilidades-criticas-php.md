---
title: "PHP discloses two critical vulnerabilities that allow unauthenticated code execution"
excerpt: "Two CVSS 9.2 flaws in the PHP runtime itself. Which versions to update and how to mitigate in the meantime."
category: "Security"
author: "ELEM Team"
date: "2026-10-21"
---

PHP has disclosed two critical vulnerabilities, rated CVSS 9.2, that could allow unauthenticated code execution on the server. The problem lies in the PHP runtime itself, before any application logic runs. That is why a login, permission checks or an application-level WAF are not enough.

## Which vulnerabilities were reported

- **CVE-2026-109618:** memory corruption caused by a fault in memory handling at the start of a request.
- **CVE-2026-109619:** a *use-after-free* vulnerability that can affect worker state across requests.

The impact spans several environments, including PHP-FPM, mod_php, php-cgi, FrankenPHP and LiteSpeed.

## Which versions to update

The fixed versions listed in the advisory are:

- PHP 8.5.12
- PHP 8.4.27
- PHP 8.3.36
- PHP 8.2.35

If you are still on PHP 8.2, this is also a good time to plan the migration: its security support ends on December 31, 2026.

## What to do if you cannot update yet

As a temporary mitigation, review these settings in `php.ini` or in your PHP-FPM pool configuration:

```ini
session.upload_progress.enabled = 0
post_max_size = 32M
```

If your application does not need file uploads, you can lower `post_max_size` to `8M`. If you do accept uploads, make sure `upload_max_filesize` is lower than `post_max_size`.

On PHP 8.5, also add:

```ini
fatal_error_backtraces = 0
```

Another measure that can help in some environments is:

```ini
memory_limit = -1
```

The changes must be applied to PHP's effective configuration — not through `ini_set()` or `.user.ini` — and the workers must be restarted for them to take effect.

**These are temporary mitigations: they do not replace updating to a fixed version.**

## On our side

We have already applied the available mitigations and are waiting for the distribution's updated packages to complete the upgrade.

## Official sources

- [PHP advisory](https://www.php.net/archive/2026.php#2026-10-21-5)
- [Advisory CVE-2026-109618 (GHSA-w8hw-w9fx-j79w)](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w)
- [Advisory CVE-2026-109619 (GHSA-6wmf-4rv5-p3rp)](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp)
