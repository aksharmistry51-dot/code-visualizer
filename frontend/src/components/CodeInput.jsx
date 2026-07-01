import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'

const SAMPLES = {
  JavaScript: [
    {
      label: '👋 Hello World',
      code: `console.log("Hello, World!");`
    },
    {
      label: '➕ Sum of Two Numbers',
      code: `let a = 10;
let b = 20;
let sum = a + b;
console.log("Sum:", sum);`
    },
    {
      label: '🔀 If-Else (Even or Odd)',
      code: `let num = 7;

if (num % 2 === 0) {
  console.log(num + " is Even");
} else {
  console.log(num + " is Odd");
}`
    },
    {
      label: '🔁 For Loop (Print 1 to 10)',
      code: `for (let i = 1; i <= 10; i++) {
  console.log(i);
}`
    },
    {
      label: '⭐ Pattern Printing (Right Triangle)',
      code: `let rows = 5;

for (let i = 1; i <= rows; i++) {
  let pattern = "";
  for (let j = 1; j <= i; j++) {
    pattern += "* ";
  }
  console.log(pattern);
}`
    },
    {
      label: '🔢 Factorial (Using Loop)',
      code: `let n = 6;
let factorial = 1;

for (let i = 1; i <= n; i++) {
  factorial *= i;
}

console.log("Factorial of " + n + " is " + factorial);`
    },
    {
      label: '📋 Array Traversal',
      code: `let fruits = ["Apple", "Banana", "Mango", "Orange"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}`
    },
    {
      label: '🔍 Linear Search',
      code: `let arr = [10, 25, 3, 47, 8];
let target = 47;
let found = false;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) {
    console.log("Found at index " + i);
    found = true;
    break;
  }
}

if (!found) {
  console.log("Not found");
}`
    },
    {
      label: '📈 Bubble Sort',
      code: `let arr = [64, 34, 25, 12, 22];
let n = arr.length;

for (let i = 0; i < n - 1; i++) {
  for (let j = 0; j < n - i - 1; j++) {
    if (arr[j] > arr[j + 1]) {
      let temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}

console.log("Sorted:", arr);`
    },
    {
      label: '🔄 Reverse a String',
      code: `let str = "CodeVision";
let reversed = "";

for (let i = str.length - 1; i >= 0; i--) {
  reversed += str[i];
}

console.log("Reversed:", reversed);`
    }
  ],

  Python: [
    {
      label: '👋 Hello World',
      code: `print("Hello, World!")`
    },
    {
      label: '➕ Sum of Two Numbers',
      code: `a = 10
b = 20
sum = a + b
print("Sum:", sum)`
    },
    {
      label: '🔀 If-Else (Even or Odd)',
      code: `num = 7

if num % 2 == 0:
    print(num, "is Even")
else:
    print(num, "is Odd")`
    },
    {
      label: '🔁 For Loop (Print 1 to 10)',
      code: `for i in range(1, 11):
    print(i)`
    },
    {
      label: '⭐ Pattern Printing (Right Triangle)',
      code: `rows = 5

for i in range(1, rows + 1):
    print("* " * i)`
    },
    {
      label: '🔢 Factorial (Using Loop)',
      code: `n = 6
factorial = 1

for i in range(1, n + 1):
    factorial *= i

print("Factorial of", n, "is", factorial)`
    },
    {
      label: '📋 Array Traversal',
      code: `fruits = ["Apple", "Banana", "Mango", "Orange"]

for fruit in fruits:
    print(fruit)`
    },
    {
      label: '🔍 Linear Search',
      code: `arr = [10, 25, 3, 47, 8]
target = 47
found = False

for i in range(len(arr)):
    if arr[i] == target:
        print("Found at index", i)
        found = True
        break

if not found:
    print("Not found")`
    },
    {
      label: '📈 Bubble Sort',
      code: `arr = [64, 34, 25, 12, 22]
n = len(arr)

for i in range(n - 1):
    for j in range(n - i - 1):
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]

print("Sorted:", arr)`
    },
    {
      label: '🔄 Reverse a String',
      code: `text = "CodeVision"
reversed_text = ""

for i in range(len(text) - 1, -1, -1):
    reversed_text += text[i]

print("Reversed:", reversed_text)`
    }
  ],

  Java: [
    {
      label: '👋 Hello World',
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
    },
    {
      label: '➕ Sum of Two Numbers',
      code: `public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        int sum = a + b;
        System.out.println("Sum: " + sum);
    }
}`
    },
    {
      label: '🔀 If-Else (Even or Odd)',
      code: `public class Main {
    public static void main(String[] args) {
        int num = 7;
        if (num % 2 == 0) {
            System.out.println(num + " is Even");
        } else {
            System.out.println(num + " is Odd");
        }
    }
}`
    },
    {
      label: '🔁 For Loop (Print 1 to 10)',
      code: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            System.out.println(i);
        }
    }
}`
    },
    {
      label: '⭐ Pattern Printing (Right Triangle)',
      code: `public class Main {
    public static void main(String[] args) {
        int rows = 5;
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`
    },
    {
      label: '🔢 Factorial (Using Loop)',
      code: `public class Main {
    public static void main(String[] args) {
        int n = 6;
        long factorial = 1;
        for (int i = 1; i <= n; i++) {
            factorial *= i;
        }
        System.out.println("Factorial of " + n + " is " + factorial);
    }
}`
    },
    {
      label: '📋 Array Traversal',
      code: `public class Main {
    public static void main(String[] args) {
        String[] fruits = {"Apple", "Banana", "Mango", "Orange"};
        for (int i = 0; i < fruits.length; i++) {
            System.out.println(fruits[i]);
        }
    }
}`
    },
    {
      label: '🔍 Linear Search',
      code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 25, 3, 47, 8};
        int target = 47;
        boolean found = false;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                System.out.println("Found at index " + i);
                found = true;
                break;
            }
        }
        if (!found) System.out.println("Not found");
    }
}`
    },
    {
      label: '📈 Bubble Sort',
      code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22};
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        for (int x : arr) System.out.print(x + " ");
    }
}`
    },
    {
      label: '🔄 Reverse a String',
      code: `public class Main {
    public static void main(String[] args) {
        String str = "CodeVision";
        String reversed = "";
        for (int i = str.length() - 1; i >= 0; i--) {
            reversed += str.charAt(i);
        }
        System.out.println("Reversed: " + reversed);
    }
}`
    }
  ],

  'C++': [
    {
      label: '👋 Hello World',
      code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`
    },
    {
      label: '➕ Sum of Two Numbers',
      code: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20;
    int sum = a + b;
    cout << "Sum: " << sum << endl;
    return 0;
}`
    },
    {
      label: '🔀 If-Else (Even or Odd)',
      code: `#include <iostream>
using namespace std;

int main() {
    int num = 7;
    if (num % 2 == 0) {
        cout << num << " is Even" << endl;
    } else {
        cout << num << " is Odd" << endl;
    }
    return 0;
}`
    },
    {
      label: '🔁 For Loop (Print 1 to 10)',
      code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 10; i++) {
        cout << i << endl;
    }
    return 0;
}`
    },
    {
      label: '⭐ Pattern Printing (Right Triangle)',
      code: `#include <iostream>
using namespace std;

int main() {
    int rows = 5;
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            cout << "* ";
        }
        cout << endl;
    }
    return 0;
}`
    },
    {
      label: '🔢 Factorial (Using Loop)',
      code: `#include <iostream>
using namespace std;

int main() {
    int n = 6;
    long factorial = 1;
    for (int i = 1; i <= n; i++) {
        factorial *= i;
    }
    cout << "Factorial of " << n << " is " << factorial << endl;
    return 0;
}`
    },
    {
      label: '📋 Array Traversal',
      code: `#include <iostream>
using namespace std;

int main() {
    string fruits[] = {"Apple", "Banana", "Mango", "Orange"};
    int n = 4;
    for (int i = 0; i < n; i++) {
        cout << fruits[i] << endl;
    }
    return 0;
}`
    },
    {
      label: '🔍 Linear Search',
      code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 25, 3, 47, 8};
    int n = 5, target = 47;
    bool found = false;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            cout << "Found at index " << i << endl;
            found = true;
            break;
        }
    }
    if (!found) cout << "Not found" << endl;
    return 0;
}`
    },
    {
      label: '📈 Bubble Sort',
      code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {64, 34, 25, 12, 22};
    int n = 5;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    return 0;
}`
    },
    {
      label: '🔄 Reverse a String',
      code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string str = "CodeVision";
    string reversed = "";
    for (int i = str.length() - 1; i >= 0; i--) {
        reversed += str[i];
    }
    cout << "Reversed: " << reversed << endl;
    return 0;
}`
    }
  ]
}

const LANG_MAP = {
  JavaScript: 'javascript',
  Python: 'python',
  Java: 'java',
  'C++': 'cpp'
}

function getLanguageExtension(language) {
  switch (language) {
    case 'Python': return python()
    case 'Java': return java()
    case 'C++': return cpp()
    default: return javascript()
  }
}

function CodeInput({ code, setCode, onAnalyze, loading, language }) {
  const [fontSize, setFontSize] = useState(14)
  const [selectedSample, setSelectedSample] = useState('')
  const [showSamples, setShowSamples] = useState(false)

  const fileName = language === 'Python' ? 'main.py'
    : language === 'Java' ? 'Main.java'
    : language === 'C++' ? 'main.cpp'
    : 'main.js'

  const samples = SAMPLES[language] || []

  const handleSampleSelect = (sample) => {
    setCode(sample.code)
    setSelectedSample(sample.label)
    setShowSamples(false)
  }

  const handleDownload = () => {
    if (!code) return
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setCode('')
    setSelectedSample('')
  }

  return (
    <div className="rounded-2xl overflow-hidden flex flex-col h-full" style={{ background: '#1e1e1e', border: '1px solid #252C42' }}>

      {/* Top toolbar */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0" style={{ background: '#111827', borderBottom: '1px solid #252C42' }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#EF4444' }}></div>
          <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B' }}></div>
          <div className="w-3 h-3 rounded-full" style={{ background: '#22C55E' }}></div>
          <span className="ml-3 text-xs font-medium" style={{ color: '#94A3B8', fontFamily: 'JetBrains Mono' }}>{fileName}</span>
        </div>
        <span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ background: 'rgba(79,140,255,0.1)', color: '#4F8CFF', border: '1px solid rgba(79,140,255,0.2)' }}>
          {language || 'JavaScript'}
        </span>
      </div>

      {/* Second toolbar */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0 flex-wrap gap-2" style={{ background: '#1a1a2e', borderBottom: '1px solid #252C42' }}>

        {/* Samples dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSamples(!showSamples)}
            className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all duration-200"
            style={{ background: '#151B2D', color: '#94A3B8', border: '1px solid #252C42' }}
          >
            ⚡ Samples {selectedSample && <span style={{ color: '#4F8CFF' }}>— {selectedSample}</span>}
            <span style={{ color: '#4B5563' }}>{showSamples ? '▲' : '▼'}</span>
          </button>
          {showSamples && (
            <div className="absolute top-full left-0 mt-1 rounded-xl overflow-hidden z-50 min-w-52" style={{ background: '#111827', border: '1px solid #252C42' }}>
              {samples.map((sample) => (
                <button
                  key={sample.label}
                  onClick={() => handleSampleSelect(sample)}
                  className="w-full text-left px-4 py-2.5 text-xs transition-all duration-150"
                  style={{ color: '#E5E7EB', borderBottom: '1px solid #1a1a2e' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(79,140,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFontSize(f => Math.max(10, f - 1))}
              className="text-xs w-6 h-6 rounded flex items-center justify-center"
              style={{ background: '#151B2D', color: '#94A3B8', border: '1px solid #252C42' }}
            >−</button>
            <span className="text-xs w-8 text-center" style={{ color: '#94A3B8' }}>{fontSize}px</span>
            <button
              onClick={() => setFontSize(f => Math.min(24, f + 1))}
              className="text-xs w-6 h-6 rounded flex items-center justify-center"
              style={{ background: '#151B2D', color: '#94A3B8', border: '1px solid #252C42' }}
            >+</button>
          </div>

          <button
            onClick={handleDownload}
            disabled={!code}
            className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200 disabled:opacity-40"
            style={{ background: '#151B2D', color: '#94A3B8', border: '1px solid #252C42' }}
          >
            ↓ Download
          </button>

          <button
            onClick={handleReset}
            disabled={!code}
            className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200 disabled:opacity-40"
            style={{ background: '#151B2D', color: '#94A3B8', border: '1px solid #252C42' }}
          >
            ↺ Reset
          </button>
        </div>
      </div>

      {/* CodeMirror Editor */}
      <div className="flex-1 min-h-0 overflow-auto">
        <CodeMirror
          value={code}
          height="100%"
          theme={vscodeDark}
          extensions={[getLanguageExtension(language)]}
          onChange={(val) => setCode(val)}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            autocompletion: true,
            indentOnInput: true,
            tabSize: 2,
          }}
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: 'JetBrains Mono, monospace',
            height: '100%',
          }}
        />
      </div>

      {/* Analyze button */}
      <div className="px-4 py-3 shrink-0" style={{ background: '#111827', borderTop: '1px solid #252C42' }}>
        <button
          onClick={onAnalyze}
          disabled={loading || !code.trim()}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.99]"
          style={{
            background: loading ? '#252C42' : 'linear-gradient(135deg, #4F8CFF, #00D4FF)',
            color: loading ? '#94A3B8' : '#0B0F19'
          }}
        >
          {loading ? 'Analyzing...' : '▶ Analyze Code'}
        </button>
      </div>
    </div>
  )
}

export default CodeInput