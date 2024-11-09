# `service_medical_supplies`

|      | column                                          | type      |
| ---- | ----------------------------------------------- | --------- |
| _UK_ | **service_medical_supply_id**                   | `Integer` |
| _FK_ | [**billing_service_id**](./billing_services.md) | `Integer` |
| _FK_ | [**medical_supply_id**](./medical_supplies.md)  | `Integer` |
|      | **quantity**                                    | `Integer` |
|      | **total_amount**                                | `String`  |
|      | **created_at**                                  | `Date`    |

---

2024-11-08 20:40
