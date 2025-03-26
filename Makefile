RunLocal:
	npm run dev

updev:
	cp .env.dev .env.local 
	make RunLocal

upstage:
	cp .env.stag .env.local 
	make RunLocal
upprod:
	cp .env.prod .env.local 
	make RunLocal



devDeploy:
	git checkout R1dev
	git pull
	git merge -
	git push
	cp .env.dev .env.local 
	cp firebase.json firebase.copy.json
	cp firebase.dev.json firebase.json
	npm run build
	firebase deploy --only hosting:n-raft-dev
	cp firebase.copy.json firebase.json
	git checkout -

# stageDeploy:
# 	git checkout N4staging
# 	git pull
# 	git merge -
# 	git push
# 	cp .env.stag .env.local 
# 	cp firebase.json firebase.copy.json
# 	cp firebase.stag.json firebase.json
# 	npm run build
# 	firebase deploy --only hosting --project nworx4staging
# 	cp firebase.copy.json firebase.json
# 	git checkout -

# prodDeploy:
# 	git checkout N4prod
# 	git pull
# 	git merge -
# 	git push
# 	cp .env.prod .env.local 
# 	cp firebase.json firebase.copy.json
# 	cp firebase.prod.json firebase.json
# 	npm run build
# 	firebase deploy --only hosting --project nworx4prod
# 	cp firebase.copy.json firebase.json
# 	git checkout -


	