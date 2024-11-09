# `billing_services`

|      | column                                | type     |
| ---- | ------------------------------------- | -------- |
| _UK_ | **billing_service_id**                | `Int`    |
| _FK_ | [**billing_id**](./billings/index.md) | `Int`    |
| _FK_ | [**service_id**](./services.md)       | `Int`    |
|      | **quantity**                          | `Int`    |
|      | **total_cost**                        | `String` |
|      | **created_at**                        | `Date`   |

---

2024-11-09 00:55
