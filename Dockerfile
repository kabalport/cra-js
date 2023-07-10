# Base 이미지로 Node.js를 사용합니다.
FROM node:16-alpine

# 앱 디렉토리를 생성하고 작업 디렉토리로 설정합니다.
WORKDIR /app

# 앱 종속성을 설치하기 위해 package.json과 package-lock.json을 복사합니다.
COPY package*.json ./

# NPM을 사용하여 앱 종속성을 설치합니다.
RUN npm install

# 소스 코드와 기타 파일을 컨테이너의 작업 디렉토리로 복사합니다.
COPY . .

# 앱을 빌드합니다.
RUN npm run build

# 앱을 실행하기 위해 serve를 설치합니다.
RUN npm install -g serve

# 컨테이너가 실행될 때 실행할 명령을 설정합니다.
CMD ["serve", "-s", "build"]