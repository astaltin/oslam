# `service_medications`

|      | column                                          | type      |
| ---- | ----------------------------------------------- | --------- |
| _UK_ | **service_medication_id**                       | `Integer` |
| _FK_ | [**billing_service_id**](./billing_services.md) | `Integer` |
| _FK_ | [**medication_id**](./medications.md)           | `Integer` |
|      | **quantity**                                    | `Integer` |
|      | **total_amount**                                | `String`  |
|      | **created_at**                                  | `Date`    |

---

2024-11-08 20:40
