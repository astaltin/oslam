# `billing_discounts`

|      | column                                | type     |
| ---- | ------------------------------------- | -------- |
| _UK_ | **billing_discount_id**               | `Int`    |
| _FK_ | [**billing_id**](./billings/index.md) | `Int`    |
| _FK_ | [**discount_id**](./discounts.md)     | `Int`    |
|      | **amount**                            | `String` |
|      | **created_at**                        | `Date`   |

---

2024-11-09 00:56
