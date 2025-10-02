// User and Authentication Types
export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
  }
  
  export interface AuthResult {
    success: boolean;
    user?: User;
    error?: string;
  }
  
  // Weather Types
  export interface WeatherData {
    date: string;
    weatherCode: number;
    weatherCondition: WeatherCondition;
    maxTemp: number;
    minTemp: number;
    avgTemp: number;
    hourlyData: HourlyWeatherData[];
  }
  
  export interface HourlyWeatherData {
    time: string;
    weatherCode: number;
    weatherCondition: WeatherCondition;
    temperature: number;
  }
  
  export type WeatherCondition = 
    | 'sunny' 
    | 'cloudy' 
    | 'rainy' 
    | 'snowy' 
    | 'thunderstorm' 
    | 'foggy' 
    | 'windy' 
    | 'unknown';
  
  export type TemperatureRange = 'cold' | 'cool' | 'warm' | 'hot';
  
  export interface BestEventDate {
    date: string;
    startTime: string;
    endTime: string;
    weather: WeatherCondition;
    temperature: number;
    confidence: 'high' | 'medium' | 'low';
  }
  
  // Event Types
  export interface Event {
    id: string;
    title: string;
    description?: string;
    date: string;
    startTime: string;
    endTime: string;
    location?: string;
    weatherPreference?: WeatherCondition | WeatherCondition[];
    temperaturePreference?: TemperatureRange;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface NewEventData {
    title: string;
    description?: string;
    date: string;
    startTime: string;
    endTime: string;
    location?: string;
    weatherPreference?: WeatherCondition | WeatherCondition[];
    temperaturePreference?: TemperatureRange;
  }
  
  // Location Types
  export interface Location {
    latitude: number;
    longitude: number;
    name?: string;
    country?: string;
  }
  
  // Context Types
  export interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    signUp: (email: string, password: string, displayName: string) => Promise<AuthResult>;
    signIn: (email: string, password: string) => Promise<AuthResult>;
    signOut: () => Promise<AuthResult>;
    clearError: () => void;
  }
  
export interface EventsContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  addEvent: (eventData: NewEventData) => Promise<{ success: boolean; error?: string }>;
  updateEvent: (eventId: string, eventData: Partial<NewEventData>) => Promise<{ success: boolean; error?: string }>;
  deleteEvent: (eventId: string) => Promise<{ success: boolean; error?: string }>;
  getEventsByDateRange: (startDate: string, endDate: string) => Event[];
  clearError: () => void;
}
  
  // Component Props Types
  export interface CalendarProps {
    defaultView: 'week' | 'month';
    onViewChange: (view: 'week' | 'month') => void;
    selectedDate?: string | null;
    onDateSelect: (date: string) => void;
  }
  
  export interface ViewDropdownProps {
    viewType: 'week' | 'month';
    onViewChange: (view: 'week' | 'month') => void;
  }
  
  export interface NewEventButtonProps {
    className?: string;
  }
  
  export interface PlannedEventsProps {
    className?: string;
  }
  
  export interface AlertProps {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    onClose?: () => void;
    autoClose?: boolean;
    duration?: number;
  }
  
  export interface LoginProps {
    className?: string;
  }
  
  export interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    className?: string;
  }
  
  export interface ProtectedRouteProps {
    children: React.ReactNode;
  }
  
  export interface SignOutButtonProps {
    className?: string;
  }
  
  export interface TitleProps {
    className?: string;
  }
  
  export interface FooterProps {
    className?: string;
  }
  
  export interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
  }
  
  export interface NewEventProps {
    isOpen: boolean;
    onClose: () => void;
    onEventCreated?: (event: Event) => void;
  }
  
  export interface ModifyEventProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event;
    onEventUpdated?: (event: Event) => void;
  }
  
  export interface ManualEventProps {
    isOpen: boolean;
    onClose: () => void;
    onEventCreated?: (event: Event) => void;
  }
  
  // Month and Week View Types
  export interface MonthViewProps {
    selectedDate?: string | null;
    onDateSelect: (date: string) => void;
  }
  
  export interface WeekViewProps {
    selectedDate?: string | null;
    onDateSelect: (date: string) => void;
  }
  