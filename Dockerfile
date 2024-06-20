# Use the official OpenJDK 21 image as the base image
FROM openjdk:21-jdk

ADD target/entgra-frontend.jar entgra-frontend.jar

# Run the jar file
ENTRYPOINT ["java","-jar","entgra-frontend.jar"]

# Expose the application port
EXPOSE 8081
