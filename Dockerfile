# Stage 1: Build the project
FROM maven:3.9.7-eclipse-temurin-21 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the project source code
COPY src ./src
COPY frontend ./frontend

# build the project
RUN mvn package

# Stage 2: Run the application
FROM eclipse-temurin:21-jre

# Set the working directory inside the container
WORKDIR /app

# Copy the built jar file from the first stage
COPY --from=builder /app/target/*.jar entgra-frontend.jar

# Expose the application port
EXPOSE 8081

# Define the command to run the application
ENTRYPOINT ["java", "-jar", "entgra-frontend.jar"]

