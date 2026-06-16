import json
import re

def extract_colors(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
        colors = {}
        def traverse(obj, path=''):
            for key, val in obj.items():
                if isinstance(val, dict):
                    if val.get('$type') == 'color' and '$value' in val and isinstance(val['$value'], dict) and 'hex' in val['$value']:
                        colors[path + key] = val['$value']['hex']
                    else:
                        if key not in ['$value', '$extensions']:
                            traverse(val, path + key + '-')
        traverse(data)
        return colors
    except Exception as e:
        return str(e)

print("LIGHT COLORS:", extract_colors('design-system/Light.tokens.json'))
print("DARK COLORS:", extract_colors('design-system/Dark.tokens.json'))

try:
    with open('design-system/Typography.svg', 'r', encoding='utf-8') as f:
        content = f.read()
    sizes = set(re.findall(r'font-size[:=][\s\"\']*([\d\.]+(?:px|em|rem)?)', content))
    print("FONT SIZES:", sizes)
except Exception as e:
    print("SVG Error:", e)
