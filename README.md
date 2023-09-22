# API Gateway Service for Soora Spaced Repetition Test

This repository serves the API Gateway service for the Soora Spaced Repetition Test.

## Instructions

### 1. Clone the repository

```bash
git clone https://github.com/abulhuman/soora-sr-api-gateway.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the service
> ⚠️⚠️⚠️ Make sure the other services (auth svc and flashcard svc) are running before this step, otherwise your api gateway fail and you *__will__* get errors.

```bash
npm run dev
```

### 4. Test the service

Use the postman collection json file provided in this repository to test the api gateway.

[POSTMAN Collection File](./Soora-sr-api-gateway.postman_collection.json)