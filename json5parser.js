const stripComments = (jsonWithComments) => {
    return jsonWithComments.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
};

class RecursiveJSONParser {
    constructor(jsonString) {
      this.jsonString = jsonString.trim(); // Remove surrounding whitespace
      this.index = 0;
    }
  
    // Main entry point for parsing
    parse() {
      return this._parseValue();
    }
  
    // Parse a JSON value (string, number, object, array, true, false, null)
    _parseValue() {
      const char = this._peek();
  
      if (char === '{') {
        return this._parseObject();  // JSON Object
      } else if (char === '[') {
        return this._parseArray();  // JSON Array
      } else if (char === '"') {
        return this._parseString();  // JSON String
      } else if (this._isNumberStart()) {
        return this._parseNumber();  // JSON Number
      } else if (this._match('true')) {
        return true;  // JSON true
      } else if (this._match('false')) {
        return false;  // JSON false
      } else if (this._match('null')) {
        return null;  // JSON null
      } else {
        throw new SyntaxError(`Unexpected character: ${char}`);
      }
    }
  
    // Parse a JSON object
    _parseObject() {
      this._consume('{');
      const obj = {};
  
      while (true) {
        this._skipWhitespace();
        if (this._peek() === '}') {
          this._consume('}');
          break;
        }
  
        const key = this._parseString(); // Parse key
        this._skipWhitespace();
        this._consume(':'); // Consume ':'
        const value = this._parseValue(); // Parse value
        obj[key] = value;
  
        this._skipWhitespace();
        if (this._peek() === '}') {
          this._consume('}');
          break;
        }
  
        this._consume(','); // Consume comma for next pair
      }
  
      return obj;
    }
  
    // Parse a JSON array
    _parseArray() {
      this._consume('[');
      const arr = [];
  
      while (true) {
        this._skipWhitespace();
        if (this._peek() === ']') {
          this._consume(']');
          break;
        }
  
        const value = this._parseValue(); // Parse array element
        arr.push(value);
  
        this._skipWhitespace();
        if (this._peek() === ']') {
          this._consume(']');
          break;
        }
  
        this._consume(','); // Consume comma for next element
      }
  
      return arr;
    }
  
    // Parse a JSON string
    _parseString() {
      this._consume('"');
      let str = '';
      while (this._peek() !== '"') {
        str += this.jsonString[this.index];
        this.index++;
      }
      this._consume('"');
      return str;
    }
  
    // Parse a JSON number
    _parseNumber() {
      let numStr = '';
      while (this._peek() && /[0-9.-]/.test(this._peek())) {
        numStr += this.jsonString[this.index];
        this.index++;
      }
      return parseFloat(numStr);
    }
  
    // Helper functions
  
    // Look at the next character
    _peek() {
      return this.jsonString[this.index];
    }
  
    // Consume a character
    _consume(char) {
      if (this._peek() === char) {
        this.index++;
      } else {
        throw new SyntaxError(`Expected '${char}' but found '${this._peek()}'`);
      }
    }
  
    // Skip whitespace characters
    _skipWhitespace() {
      while (/\s/.test(this._peek())) {
        this.index++;
      }
    }
  
    // Check if the current character is the start of a number
    _isNumberStart() {
      const char = this._peek();
      return /[0-9.-]/.test(char);
    }
  
    // Match a literal string
    _match(str) {
      if (this.jsonString.slice(this.index, this.index + str.length) === str) {
        this.index += str.length;
        return true;
      }
      return false;
    }
}

const jsonString = '{"name": "John", "age": 30, "isStudent": false, "courses": ["Math", "Science"]}';
  
const parser = new RecursiveJSONParser(jsonString);
try {
    const parsedData = parser.parse();
    console.log(parsedData);
} catch (error) {
    console.error("Error parsing JSON:", error);
}  