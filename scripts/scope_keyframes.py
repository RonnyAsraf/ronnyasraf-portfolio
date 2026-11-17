"""Gives every @keyframes in a generated motion component a unique prefix.
Astro does not scope keyframe names, so two components that both define e.g. `zoom` overwrite each other."""
import re, sys

def scope(path, prefix):
    s = open(path).read()
    names = set(re.findall(r'@keyframes ([\w-]+)', s))
    for n in sorted(names, key=len, reverse=True):
        if n.startswith(prefix + '-'): continue
        s = re.sub(rf'@keyframes {re.escape(n)}\b', f'@keyframes {prefix}-{n}', s)
        s = re.sub(rf'(animation(?:-name)?:\s*){re.escape(n)}\b', rf'\g<1>{prefix}-{n}', s)
    open(path, 'w').write(s)

if __name__ == '__main__':
    scope(sys.argv[1], sys.argv[2])
