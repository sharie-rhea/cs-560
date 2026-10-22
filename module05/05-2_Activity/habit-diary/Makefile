.PHONY: setup clean

setup:
	cd frontend && npm install
	cd backend && npm install
	cd backend && npm run migrate

clean:
	rm -rf frontend/node_modules
	rm -rf backend/node_modules
	rm -rf frontend/dist
	rm -rf backend/dist
	rm -f backend/habit_diary.db
