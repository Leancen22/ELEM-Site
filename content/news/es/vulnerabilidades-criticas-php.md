---
title: "PHP publica dos vulnerabilidades críticas que permiten ejecutar código sin autenticación"
excerpt: "Dos fallos con CVSS 9.2 en el propio runtime de PHP. Qué versiones actualizar y cómo mitigar mientras tanto."
category: "Seguridad"
author: "Equipo ELEM"
date: "2026-10-21"
---

PHP publicó dos vulnerabilidades críticas, con un CVSS de 9.2, que podrían permitir la ejecución de código en el servidor sin autenticación. El problema está en el propio runtime de PHP, antes de que llegue a ejecutarse la lógica de la aplicación. Por eso, no alcanza con tener un login, controles de permisos o un WAF a nivel de aplicación.

## Qué vulnerabilidades se reportaron

- **CVE-2026-109618:** corrupción de memoria asociada a un fallo durante el manejo de memoria en el inicio de una solicitud.
- **CVE-2026-109619:** vulnerabilidad de tipo *use-after-free*, que puede afectar el estado de los workers entre solicitudes.

El impacto alcanza distintos entornos, incluidos PHP-FPM, mod_php, php-cgi, FrankenPHP y LiteSpeed.

## Qué versiones hay que actualizar

Las versiones corregidas indicadas en el aviso son:

- PHP 8.5.12
- PHP 8.4.27
- PHP 8.3.36
- PHP 8.2.35

Si todavía estás usando PHP 8.2, también es un buen momento para planificar la migración, ya que su soporte de seguridad finaliza el 31 de diciembre de 2026.

## Qué hacer si todavía no podés actualizar

Como mitigación temporal, podés revisar estos parámetros en `php.ini` o en la configuración del pool de PHP-FPM:

```ini
session.upload_progress.enabled = 0
post_max_size = 32M
```

Si tu aplicación no necesita subir archivos, podés reducir `post_max_size` a `8M`. Si permitís cargas, asegurate de que `upload_max_filesize` sea inferior a `post_max_size`.

Para PHP 8.5, agregá también:

```ini
fatal_error_backtraces = 0
```

Otra medida que puede ayudar en determinados entornos es:

```ini
memory_limit = -1
```

Los cambios deben aplicarse en la configuración efectiva de PHP, no mediante `ini_set()` ni `.user.ini`, y hay que reiniciar los workers para que surtan efecto.

**Estas medidas son mitigaciones temporales: no reemplazan la actualización a una versión corregida.**

## En nuestro caso

Ya aplicamos las mitigaciones disponibles y estamos a la espera de los paquetes actualizados de la distribución para completar la actualización.

## Fuentes oficiales

- [Aviso de PHP](https://www.php.net/archive/2026.php#2026-10-21-5)
- [Advisory CVE-2026-109618 (GHSA-w8hw-w9fx-j79w)](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w)
- [Advisory CVE-2026-109619 (GHSA-6wmf-4rv5-p3rp)](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp)
