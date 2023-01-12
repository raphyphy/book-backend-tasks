# How to run:

## Prerequisites:
0.0 Assuming you have .net 6.0+ installed. Verify this by running
```
dotnet --version
```
if not, go to https://dotnet.microsoft.com/en-us/download for installation instructions

## Build the API
1. Navigate to where Program.cs is located
2. ensure packages are properly installed. Run:
```
dotnet restore
```
3. build and run:
```
dotnet run
```
4. By default, swagger is hosted http://localhost:4000/swagger/index.html