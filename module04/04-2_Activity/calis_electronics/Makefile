.PHONY: install seed setup dev-backend dev-frontend clean

# Install dependencies for both backend and frontend
install:
	cd backend && npm install
	cd frontend && npm install

# Seed the database with sample products
seed:
	cd backend && npm run seed

# Full setup: install dependencies and seed database
setup: install seed

# Start the backend development server (runs on port 3000)
dev-backend:
	cd backend && npm run dev

# Start the frontend development server (runs on port 5173)
dev-frontend:
	cd frontend && npm run dev

# Clean up generated files
clean:
	rm -rf backend/node_modules frontend/node_modules
	rm -f backend/*.db
