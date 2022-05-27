# Ton Coding Challenge

Lambda functions to manage users and count access. The project is using API Gateway to manage requests, lambda functions to store and retrieve user data, and DynamoDB to store data.

## Production Environment

The project is deployed at:

```bash
https://lu27ky0opa.execute-api.us-east-1.amazonaws.com
```

## Resources

#

## Create an user:

```bash
POST /v1/users
```

```json
{
  "name": "Ton API User",
  "age": "30"
}
```

```json
"User Ton API User has been created"
```

#

## Get user by id:

```bash
GET /v1/users/{userId}
```

```json
{
  "Item": {
    "created_at": "2022-05-27T17:27:48.048Z",
    "name": "Marcus Macedo",
    "userId": "1653672468048",
    "age": "24"
  }
}
```

#

## List users:

```bash
GET /v1/users
```

```json
{
  "Items": [
    {
      "created_at": "2022-05-27T17:27:48.048Z",
      "name": "Marcus Macedo",
      "userId": "1653672468048",
      "age": "24"
    },
    {
      "created_at": "2022-05-27T17:04:26.378Z",
      "name": "Marcus",
      "userId": "1653671066378",
      "age": "24"
    }
  ],
  "Count": 2,
  "ScannedCount": 2
}
```

#

## Increase counter:

```bash
PUT /v1/counter/increase
```

```json
{
  "value": 5
}
```

#

## Get counter:

```bash
GET /v1/counter
```

```json
{
  "value": 5
}
```

#

## License

[MIT](https://choosealicense.com/licenses/mit/)
