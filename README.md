# GraphApplication

Welcome to GraphApplication, a user-friendly web application designed to facilitate data visualization through various graph types. Whether you are a data analyst, student, or anyone in need of visualizing data, this tool is crafted to make your data representation seamless and interactive.

# Wiki - GraphApplication

This is the wiki for the GraphApplication project. It contains information about the project.

[Wiki - GraphApplication](https://github.com/JonathanFlores8/L3/wiki)

## Table of Contents

1. [Getting Started](#getting-started)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Usage](#usage)
5. [Troubleshooting](#troubleshooting)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)

### Installation

1. **Clone the Repository from your Terminal**

    **For example:**
   ```sh
   git clone git@github.com:JonathanFlores8/L3.git
   ```
   ```sh
   cd L3
   ```

2. **Install Dependencies**

   Run the following command to install the required packages:

   ```sh
   npm install
   ```

## Running the Application

After installing the dependencies, you can start the application using:

```sh
npm run dev
```

This will start the development server from Vite. You can access the application at [http://localhost:5173](http://localhost:5173).

## Usage

GraphApplication provides an intuitive interface to input your data, choose the graph type, and visualize the data.

1. **Enter Graph Details**: Use the provided input field to enter the title.

![Input Fields](/images/readme-images/1.png)

2. **Choose Graph Type**: Select the type of graph you wish to create from the dropdown menu.

![Graph Type](/images/readme-images/2.png)

3. **Input Data**: Enter the labels and corresponding data values for the graph and click the "Generate Graph" button.

![Input Data](/images/readme-images/3.png)

4. **Download**: You can download the graph as a PNG image.

![Download](/images/readme-images/4.png)

## Troubleshooting

If you encounter any issues while using GraphApplication, please follow these steps:

1. Ensure all prerequisites are properly installed.
2. Check the console in your web browser’s developer tools for any errors.
3. Ensure all npm dependencies are correctly installed by running `npm install`.
4. If the issue persists, please [report the issue](https://github.com/JonathanFlores8/L3/issues) on GitHub.

**Known issue:**
The module import can in some cases not work properly. If this happens, import the module directly from the node_modules folder.

## Contributing

The application is developed using ES6 JavaScript with custom Web Components. If you wish to contribute to the project or the module [GraphifyJS](https://github.com/JonathanFlores8/GraphifyJS)
 , here is a list of examples of areas of improvement:

- **Update GraphifyJS**: The GraphifyJS module can be updated to support more graph types and in-data features.
- **Code Refactoring**: The code can be refactored to improve readability and maintainability.
- **Testing**: The application can be improved with automated testing.

## Testing

This project does only contain manual testing. For more information, see [test-report.md](./test-report.md).

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contact

If you have any questions or comments, feel free to [open an issue](https://github.com/JonathanFlores8/L3/issues) or contact the project maintainer at jf223mu@student.lnu.se.

---