export type Munzee = Readonly<{
  munzee_id?: number;
  friendly_name?: string;
  latitude?: number;
  longitude?: number;
  original_pin_image?: string;
  proximity_radius_ft?: number;
  creator_user_id?: number;
  creator_username?: string;
  has_user_captured_munzee?: number;
  owned_by_user?: number;
  capture_type_id?: number;
  rps_munzee?: number;
  code?: string;
  number_of_captures?: number;
  is_virtual?: number;
  maintenance?: string;
  rovers?: ReadonlyArray<string>;
  pin_icon?: any;
  munzee_logo?: string;
  image?: string;
  special_good_until?: number;
  magnet_expires_at?: string;
  magnets_used_today?: number;
  captured_at?: string;
  deployed_at?: string;
  deployed_at_unix?: number;
  points?: number;
  archived?: number;
  archived_at?: null;
  deployed?: number;
  motel_id?: number;
  hotel_id?: number;
  resort_id?: number;
  notes?: string;
  first_to_capture?: Readonly<{
    username: string;
    user_id: number;
  }>;
  first_captured_user_id?: number;
  last_captured_at?: string;
  last_captured_by_id?: number;
  last_captured_username?: string;
  last_captured_points?: number;
  secure_social?: boolean;
  url?: string;
  generic_code?: boolean;
  generic_code_hash?: string;
  photos?: number;
  number_of_entries?: number;
  last_updated_at?: string;
  needs_rover_level?: number;
  unicorn?: number;
  unicorn_munzee?: Munzee;
  virtual: number;
  days_in_maintenance?: number;
  last_journal_entry_at?: string;
  bouncers?: ReadonlyArray<Munzee>;
  unicorn_id: number;
  mythological_type?: string;
  mythological_capture_type?: number;
  good_until: number;
  zeds_earned?: number;
  distance_away_in_miles?: number;
  evolution_reset_available?: number;
  undeployed_days?: number;
  undeployed_at?: string;
  relative_url?: string;
  trail_id?: number;
  trail_closed?: number;
  trail_hops?: number;
  unicorn_host?: {
    latitude: number;
    longitude: number;
    friendly_name: string;
    code?: string;
  };
  closest?: ReadonlyArray<{
    distance: number;
    friendly_name?: string;
    pin_icon?: any;
    code?: string;
  }>;
  hospitable?: number;
  can_nudge?: number;
  motel_max_rooms?: number;
  bouncing_munzee?: number;
  trail_unfinished?: string;
  trail?: MunzeeTrait[];
}>;

export type Rover = Readonly<{
  miles: string;
  active: number;
  log_at: string;
  at_munzee: number;
  at_user: number;
  created_at: string;
  current_goal_id: number;
  currently_at: Readonly<{
    bearing: number;
    compass: string;
    friendly_name: string;
    log_at: string;
    log_type: number;
    miles_to_go: number;
    munzee_data: Munzee;
    munzee_id: number;
    user_id: number;
    username: string;
  }>;
  description: string;
  global_rank: number;
  goal: Readonly<{
    distance: number;
    free_to_roam: number;
    munzee_data: Munzee;
    munzee_id: number;
    points: number;
    points_to_earn: number;
    reached: number;
    reached_at: string;
    rover_id: number;
    set_at: string;
  }>;
  level_info: Readonly<{
    highest_points_in_level: number;
    level: number;
    lowest_points_in_level: number;
    points_to_next: number;
  }>;
  rover_info: Readonly<{
    total_miles: string;
    score: string;
    level: number;
    global_rank: string;
    logo: string;
    name: string;
    username: string;
    level_info: Readonly<{
      highest_points_in_level: number;
      level: number;
      lowest_points_in_level: number;
      points_to_next: number;
    }>;
  }>;
  logo: string;
  name: string;
  previously_at_munzee_id: number;
  previously_at_user_id: number;
  rover_id: number;
  score: number;
  total_miles: number;
  type: number;
  unique_munzees: number;
  unique_users: number;
  user_id: number;
  userhash: string;
  username: string;
}>;
export type Notification = Readonly<{
  capture_id: string;
  item_id: string;
  item_type: string;
  points: number;
  timestamp: number;
  user_id: number;
  notes: string;
  munzee_data: Readonly<{
    capture_type_id: number;
    code: string;
    friendly_name: string;
    munzee_id: number;
    number_of_captures: number;
    pin_icon: string;
  }>;
  user_data: Readonly<{
    user_id: number;
    username: string;
  }>;
  new_level: number;
  badge_id: number;
  rover_id: number;
  logo: string;
  name: string;
  type_id: number;
  type_name: string;
  total_captures: number;
  total_points: number;
  text: string;
  message: string;
  photo: string;
}>;

export type Entries = Readonly<{
  entry_id: string;
  type_id: number;
  type_name: string;
  user_id: number;
  timestamp: number;
  notes: string;
  munzee_data: Readonly<{
    capture_type_id: number;
    code: string;
    friendly_name: string;
    munzee_id: number;
    number_of_captures: number;
    pin_icon: string;
  }>;
  user_data: Readonly<{
    user_id: number;
    username: string;
  }>;
}>;

export type Photos = Readonly<{
  timestamp: number;
  user_id: string;
  photo: string;
  id: string;
  munzee_data: Readonly<{
    munzee_id: string;
    friendly_name: string;
    capture_type_id: string;
    code: string;
    pin_icon: string;
  }>;
  user_data: Readonly<{
    user_id: string;
    username: string;
  }>;
}>;

export type MunzeeLog = Readonly<{
  username: string;
  user_id: string;
  created_at: string;
  notes: string;
  type_name: string;
  type_id: number;
  entry_at: string;
  entry_id: string;
  entry_at_unix: number;
  type: string;
  points?: number;
}>;

export type MunzeeRooms = Readonly<{
  creator_username: number;
  user_id: number;
  current_room_points: number;
  motel_room?: number;
  hotel_room?: number;
  expires_at?: Date;
  resort_room?: number;
}>;

export type ReferralPoints = Readonly<{
  feed: {
    new_username: string;
    points: string;
    new_user_id: string;
    awarded_at: string;
    notes: string;
  }[];
  page: number;
  has_more: number | boolean;
  introduced_by: {
    user_id: string | null;
    username: string | null;
  };
  introduced_players: {
    user_id: string | null;
    username: string | null;
  }[];
  points: number;
}>;

export type LatestCaps = Readonly<{
  latitude: string;
  longitude: string;
  code: string;
}>;

export type MunzeeIndicator = Readonly<{
  deploys: number;
  captures: number;
  day: number;  
}>;

export type MunzeeTrait = Readonly<{
  has_user_captured_munzee: number;
}>;