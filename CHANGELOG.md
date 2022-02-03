# 2.0.0

> 02/02/2022

Large rework & use miliseconds as default format. 

  - Rework `TimeMeter` to use `hrtime.bigint` and returns miliseconds by default.
  - Add common formatters (`NanosecondFormatter`, `MilisecondFormatter`, `LegacyFormatter`).
  - Add type `TimeFormatterInterface` to create custom formatters.
  - Large rework of build & deps.

# 1.0.0

> 16/04/2020

Initial time meter version.

  - Add TimeMeter class with legacy Node.js hrtime format "[seconds, nanoseconds]".
