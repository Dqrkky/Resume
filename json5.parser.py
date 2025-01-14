import re, json

def strip_comments(json_with_comments):
    comment_regex = r'\/\/.*|\/\*[\s\S]*?\*\/'
    return re.sub(comment_regex, '', json_with_comments)

# Example usage
json_with_comments = """
{
  // This is a single-line comment
  "key1": "value1", /* This is a multi-line comment */
  "key2": 42,       // Another comment here
  "key3": true
}
"""

# Strip comments
json_without_comments = strip_comments(json_with_comments)

# Print the cleaned JSON
print(json.loads(json_without_comments))
