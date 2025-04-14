# Receipt Processor Challenge
This is my backend submission to complete fetch's [receipt processor challenge](https://github.com/fetch-rewards/receipt-processor-challenge).

<br>

## 🚀 How to Build and Run (Dockerized)

1. **Build the Docker image (run this in the `fetch` dir)**
   ```bash
   docker build -t receipt-processor .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 --env-file .env receipt-processor
   ```

3. **Access the app:**
   - API Base URL: `http://localhost:3000`
   - API Docs: `http://localhost:3000/docs`

<br>

## ⚙️ Why Node.js?

Node.js was chosen for its:
- Widespread adoption and excellent ecosystem support
- Fast development cycles and active community
- My personal familiarity and proficiency with building scalable APIs using Express + TypeScript

<br>

## 🧩 Key Features

* A modular storage implementation. This will allow for expanding this tool to use a database in the future. 
* Input validation with `zod`. This provides detailed errors for bad request inputs. 
* Pino logging with log levels and structured output.
* Auto-Generated API docs. 
* Standardized Node project structure. This should make the project easy to hand off for future development use cases. 
* Unit/Integration tests with vitatest. 

