# Base 이미지로 OpenJDK를 사용합니다.
FROM openjdk:11-jre-slim

# 앱 디렉토리를 생성하고 작업 디렉토리로 설정합니다.
WORKDIR /app

# JAR 파일을 컨테이너의 앱 디렉토리로 복사합니다.
COPY . .

# 컨테이너가 실행될 때 JAR 파일을 실행합니다.
CMD ["java", "-jar", "kakao-1.0.jar"]