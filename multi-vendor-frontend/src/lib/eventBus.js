const listeners = new Map();

export function on(eventName, callback) {
    console.log('EventBus: Registering listener for event:', eventName);
    if (!listeners.has(eventName)) listeners.set(eventName, new Set());
    const set = listeners.get(eventName);
    set.add(callback);
    console.log('EventBus: Total listeners for', eventName, ':', set.size);
    return () => {
        set.delete(callback);
        if (set.size === 0) listeners.delete(eventName);
    };
}

export function emit(eventName, data) {
    console.log('EventBus: Emitting event:', eventName, 'with data:', data);
    const set = listeners.get(eventName);
    if (!set) {
        console.log('EventBus: No listeners found for event:', eventName);
        return;
    }
    console.log('EventBus: Found', set.size, 'listeners for event:', eventName);
    for (const cb of set) {
        try { cb(data); } catch {}
    }
}


