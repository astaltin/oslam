# `billing_assistance_programs`

|      | column                                                | type         |
| ---- | ----------------------------------------------------- | ------------ |
| _UK_ | **billing_assistance_program_id**                     | `Int`        |
| _FK_ | [**billing_id**](./billing/index.md)                  | `Int`        |
| _FK_ | [**assistance_program_id**](./assistance_programs.md) | `Int`        |
| _UK_ | **amount_contributed**                                | `String` |
|      | **created_at**                                        | `Date`       |
|      | **updated_at**                                        | `Date`       |
|      | **deleted_at**                                        | `Date`       |

---

2024-11-07 05:37
