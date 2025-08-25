const listeners = new Map();

export function on(eventName, callback) {
    if (!listeners.has(eventName)) listeners.set(eventName, new Set());
    const set = listeners.get(eventName);
    set.add(callback);
    return () => {
        set.delete(callback);
        if (set.size === 0) listeners.delete(eventName);
    };
}

export function emit(eventName, data) {
    const set = listeners.get(eventName);
    if (!set) return;
    for (const cb of set) {
        try { cb(data); } catch {}
    }
}


