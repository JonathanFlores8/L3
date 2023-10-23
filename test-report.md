## Manual Testing for Graph Application 

---

### Functional Requirement 1: User Interface with Input Fields

1. **FR1.1: Clearly Labeled Input Fields**
   - **Test Steps:**
     1. Identify all the input fields in the user interface.
     2. Check if each input field has a clear label.
   - **Expected Result:** All input fields have clear labels indicating the type of data expected.
   - **Actual Result:** 

    ![Input Fields](/images/test-images/test1.gif)
   - **Pass/Fail:** Fail
   - **Notes:** The application has a user interface with various input fields for the user to enter the graph title, type, labels, and data. Data can be a somewhat hard to understand cause data can be multiply things. I would suggest changing the data label to something more specific like "numbers" or "values".

2. **FR1.2: Appropriate Input Controls**
   - **Test Steps:**
     1. For each input field, check the type of input control provided (e.g., text box, drop-down list).
   - **Expected Result:** Appropriate input controls are provided based on the data type required.
   - **Actual Result:** 

   ![Input Controls](/images/test-images/test1(2).gif)
   - **Pass/Fail:** Pass
   - **Notes:** Appropriate input controls are provided based on the data type required. The user can enter text in the title and labels input fields. The user can select the graph type from a drop-down list. The user can enter numbers in the data input field.

---

### Functional Requirement 2: Keyboard Accessibility

1. **FR2.1: Full Keyboard Navigability**
   - **Test Steps:**
     1. Attempt to navigate through the entire application using only the keyboard.
   - **Expected Result:** The application is fully navigable using a keyboard.
   - **Actual Result:** 

   ![Keyboard Navigation](/images/test-images/test2.gif)
   - **Pass/Fail:** Pass
   - **Notes:** The application is fully navigable using a keyboard. The user can use the Tab key to navigate through all input fields and buttons. The user can use the Enter key to submit the form and proceed to the next step.

---

### Functional Requirement 3: Error Handling and Inline Errors

1. **FR3.1: Data Validation on User Inputs**
   - **Test Steps:**
     1. Enter invalid data into each input field.
     2. Attempt to submit or proceed in the application.
   - **Expected Result:** The application performs data validation and does not allow proceeding with invalid inputs.
   - **Actual Result:** 

   ![Data Validation](/images/test-images/test3.gif)
   - **Pass/Fail:** Pass
   - **Notes:** The application performs data validation and does not allow proceeding with invalid inputs. The user is prompted with inline error messages near the input fields with errors.

---

### Functional Requirement 4: Data Processing and Visualization

1. **FR4.1: Graph Generation on Valid Input**
   - **Test Steps:**
     1. Enter valid data into all input fields.
     2. Observe the generation of the graph representation.
   - **Expected Result:** A graph representation is generated and displayed upon receiving valid input data.
   - **Actual Result:** 

   ![Graph Generation](/images/test-images/test4.gif)
   - **Pass/Fail:** Pass
   - **Notes:** A graph representation is generated and displayed upon receiving valid input data. The user can download the graph as a PNG image or start a new graph.
