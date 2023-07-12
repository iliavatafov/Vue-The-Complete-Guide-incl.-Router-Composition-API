import { convertStringToJSON } from "@/utils";

export default {
  data() {
    return {
      errorMessage: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      if (!event.target.files) {
        this.errorMessage =
          "Somthing went wrong! Please try to attach the file again.";
      }
      const file = event.target.files[0];
      this.readFile(file);
    },
    readFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        this.processCSVData(contents);
      };
      reader.onerror = () => {
        this.errorMessage = "Error occurred while reading the file.";
      };
      reader.readAsText(file);
    },
    processCSVData(contents) {
      convertStringToJSON(contents);
    },
  },
};
