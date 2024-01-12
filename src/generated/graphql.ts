import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AddCreatorResponse = {
  creator?: Maybe<CreatorForAddCreatorResponse>;
  message?: Maybe<Scalars['String']['output']>;
};

export type AddPreferencesInput = {
  chatterId: Scalars['String']['input'];
  preferencesText: Array<Scalars['String']['input']>;
  user_id: Scalars['String']['input'];
};

export type AmountStats = {
  amount?: Maybe<Scalars['Float']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
};

export type AutoFollow = {
  active: Scalars['Boolean']['output'];
  createdBy: Scalars['ID']['output'];
  creatorId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
};

export type Best = {
  average?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ChangeAutoFollowInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
};

export type ChangeCreatorAuthInput = {
  cookie?: InputMaybe<Scalars['String']['input']>;
  expiredAt?: InputMaybe<Scalars['Date']['input']>;
  user_agent?: InputMaybe<Scalars['String']['input']>;
  user_id: Scalars['String']['input'];
  x_bc?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeDisplayColorInput = {
  color: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  inboxColor: Scalars['String']['input'];
  spend: Scalars['Int']['input'];
};

export type ChangeDisplaySettingsInput = {
  audioId: Scalars['Int']['input'];
  audioVolume: Scalars['Int']['input'];
  emojiStatus: Scalars['Boolean']['input'];
  emojis?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type ChangeExpiringFansInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  messageTiming?: InputMaybe<Scalars['Int']['input']>;
  spendingLimitation?: InputMaybe<Scalars['Boolean']['input']>;
  timeLimitation?: InputMaybe<Scalars['Int']['input']>;
};

export type ChangeExpiringFansMessageInput = {
  fallbackName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeFanNumberingInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  numbers?: InputMaybe<Scalars['Int']['input']>;
};

export type ChangeMassMessageInput = {
  fallbackName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeMassMessagingInput = {
  activeSub?: InputMaybe<Scalars['Boolean']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  excludeFans?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  neverChatBefore?: InputMaybe<Scalars['Boolean']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ChangePpvFollowInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  include?: InputMaybe<Scalars['Boolean']['input']>;
  time?: InputMaybe<Scalars['Int']['input']>;
};

export type ChangePpvMessageInput = {
  fallbackName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type ChangePromotionReactivatorInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  period?: InputMaybe<Scalars['Int']['input']>;
};

export type ChangeWelcomeMessageInput = {
  fallbackName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeWelcomeSettingsInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  time?: InputMaybe<Scalars['Int']['input']>;
};

export type Chart = {
  count?: Maybe<Scalars['Float']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
};

export type ChatterDetailed = {
  activeTime?: Maybe<Scalars['Int']['output']>;
  avgResponse?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  inActiveTime?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sentMessages?: Maybe<Scalars['Int']['output']>;
  totalRevenue?: Maybe<Scalars['Float']['output']>;
};

export type ChatterShort = {
  name?: Maybe<Scalars['String']['output']>;
  received?: Maybe<Scalars['Float']['output']>;
};

export type ChatterTracking = {
  chatterTable?: Maybe<Array<Maybe<ChatterDetailed>>>;
  revenueChart?: Maybe<Array<Maybe<RevenueChart>>>;
  topChattersChart?: Maybe<Array<Maybe<ChatterShort>>>;
};

export type ChooseAutoProxyInput = {
  country: Scalars['String']['input'];
  creatorId: Scalars['String']['input'];
};

export type ChooseHttpProxyInput = {
  creatorId: Scalars['String']['input'];
  host: Scalars['String']['input'];
  password: Scalars['String']['input'];
  port: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type Composition = {
  amountStats?: Maybe<Array<Maybe<AmountStats>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CountChartStatistic = {
  chart?: Maybe<Array<Maybe<Chart>>>;
  total?: Maybe<Scalars['Float']['output']>;
};

export type CountryMap = {
  count: Scalars['Int']['output'];
  country: Scalars['String']['output'];
};

export type CreateDisplayColorInput = {
  color: Scalars['String']['input'];
  displaySettings: Scalars['ID']['input'];
  inboxColor: Scalars['String']['input'];
  spend: Scalars['Int']['input'];
};

export type CreateExpiringFansMessageInput = {
  expiringFans: Scalars['ID']['input'];
  fallbackName: Scalars['String']['input'];
  media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text: Scalars['String']['input'];
};

export type CreateMassMessageInput = {
  fallbackName: Scalars['String']['input'];
  massMess: Scalars['ID']['input'];
  media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text: Scalars['String']['input'];
};

export type CreateMassMessageInputForMessaging = {
  fallbackName: Scalars['String']['input'];
  media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text: Scalars['String']['input'];
};

export type CreateMassMessagingInput = {
  massMessaging: MassMessagingCreate;
  messages?: InputMaybe<Array<InputMaybe<CreateMassMessageInputForMessaging>>>;
};

export type CreatePpvMessageInput = {
  creatorId: Scalars['ID']['input'];
  fallbackName: Scalars['String']['input'];
  media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text: Scalars['String']['input'];
};

export type CreateScriptFolderInput = {
  creatorId: Scalars['ID']['input'];
  folderName: Scalars['String']['input'];
};

export type CreateScriptInput = {
  customName: NameEnum;
  fallbackName: Scalars['String']['input'];
  fanName: NameEnum;
  name: Scalars['String']['input'];
  scriptFolder: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type CreateWelcomeMessageInput = {
  fallbackName: Scalars['String']['input'];
  media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text: Scalars['String']['input'];
  welcomeSettings: Scalars['ID']['input'];
};

export type Creator = {
  avatarURL?: Maybe<Scalars['String']['output']>;
  creatorAuth?: Maybe<CreatorAuth>;
  id: Scalars['ID']['output'];
  joinDate?: Maybe<Scalars['Date']['output']>;
  license?: Maybe<License>;
  link: Scalars['String']['output'];
  preferences?: Maybe<Array<Maybe<Preferences>>>;
  userId: Scalars['ID']['output'];
  userName?: Maybe<Scalars['String']['output']>;
};

export type CreatorAuth = {
  cookie?: Maybe<Scalars['String']['output']>;
  expiredAt?: Maybe<Scalars['Date']['output']>;
  user_agent?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
  x_bc?: Maybe<Scalars['String']['output']>;
};

export type CreatorAuthInput = {
  cookie: Scalars['String']['input'];
  user_agent: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
  x_bc: Scalars['String']['input'];
};

export type CreatorDeleteResponse = {
  message?: Maybe<Scalars['String']['output']>;
};

export type CreatorForAddCreatorResponse = {
  avatarURL?: Maybe<Scalars['String']['output']>;
  creatorAuth?: Maybe<CreatorAuth>;
  id: Scalars['ID']['output'];
  joinDate?: Maybe<Scalars['Date']['output']>;
  license?: Maybe<License>;
  link: Scalars['String']['output'];
  proxy?: Maybe<ProxyForCreator>;
  userId: Scalars['ID']['output'];
  userName?: Maybe<Scalars['String']['output']>;
};

export type CreatorForUser = {
  avatarURL?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  creatorAuth?: Maybe<CreatorAuth>;
  id: Scalars['ID']['output'];
  license?: Maybe<License>;
  link: Scalars['String']['output'];
  proxy?: Maybe<Proxy>;
  updatedAt: Scalars['String']['output'];
  userName?: Maybe<Scalars['String']['output']>;
};

export type CreatorResponse = {
  creator?: Maybe<Creator>;
  message?: Maybe<Scalars['String']['output']>;
};

export type CreatorWithProxy = {
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  license?: Maybe<License>;
  link: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  proxy?: Maybe<Proxy>;
  updatedAt: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type CreatorWithoutPreferences = {
  avatarURL?: Maybe<Scalars['String']['output']>;
  creatorAuth?: Maybe<CreatorAuth>;
  id: Scalars['ID']['output'];
  joinDate?: Maybe<Scalars['Date']['output']>;
  license?: Maybe<License>;
  link: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
  userName?: Maybe<Scalars['String']['output']>;
};

export type DetailedStatisticResponse = {
  conversionRate?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  linkClicks?: Maybe<Scalars['Int']['output']>;
  messagesRevenue?: Maybe<Scalars['Float']['output']>;
  newSubs?: Maybe<Scalars['Int']['output']>;
  newSubsRevenue?: Maybe<Scalars['Float']['output']>;
  openChats?: Maybe<Scalars['Int']['output']>;
  recSubsRevenue?: Maybe<Scalars['Float']['output']>;
  sellingChats?: Maybe<Scalars['Int']['output']>;
  textingRation?: Maybe<Scalars['Int']['output']>;
  tipsRevenue?: Maybe<Scalars['Float']['output']>;
  totalRevenue?: Maybe<Scalars['Float']['output']>;
};

export type DisplayColor = {
  color: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  inboxColor: Scalars['String']['output'];
  spend: Scalars['Int']['output'];
};

export type DisplayColorResponse = {
  displayColor?: Maybe<DisplayColor>;
  message?: Maybe<Scalars['String']['output']>;
};

export type DisplaySettings = {
  audioId: Scalars['Int']['output'];
  audioVolume: Scalars['Int']['output'];
  createdBy: Scalars['ID']['output'];
  creatorId: Scalars['ID']['output'];
  emojiStatus: Scalars['Boolean']['output'];
  emojis?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type DisplaySettingsResponse = {
  displaySettings?: Maybe<DisplaySettings>;
  message?: Maybe<Scalars['String']['output']>;
};

export type ExpiringFans = {
  active: Scalars['Boolean']['output'];
  createdBy: Scalars['ID']['output'];
  creatorId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  messageTiming: Scalars['Int']['output'];
  spendingLimitation: Scalars['Boolean']['output'];
  timeLimitation: Scalars['Int']['output'];
};

export type ExpiringFansMessage = {
  expiringFans: Scalars['ID']['output'];
  fallbackName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  media?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  text: Scalars['String']['output'];
};

export type ExpiringFansMessageResponse = {
  expiringFans?: Maybe<ExpiringFansMessage>;
  message?: Maybe<Scalars['String']['output']>;
};

export type ExpiringFansResponse = {
  expiringFans?: Maybe<ExpiringFans>;
  message?: Maybe<Scalars['String']['output']>;
};

export type FanNumbering = {
  active: Scalars['Boolean']['output'];
  createdBy: Scalars['ID']['output'];
  creatorId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  numbers: Scalars['Int']['output'];
};

export type GetChattersTrackingInput = {
  creatorId: Scalars['ID']['input'];
  endDate?: InputMaybe<Scalars['Date']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type GetCreatorStatisticInput = {
  creatorId: Scalars['ID']['input'];
  endDate?: InputMaybe<Scalars['Date']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type GetDatesCreatorIdInput = {
  creatorId: Scalars['ID']['input'];
  endDate?: InputMaybe<Scalars['Date']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type GetDetailedStatisticInput = {
  creatorId: Scalars['ID']['input'];
  endDate?: InputMaybe<Scalars['Date']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type GetOneChatterTrackingInput = {
  chatterId: Scalars['String']['input'];
  creatorId: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['Date']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type GetOverallDetailedComparisonResponse = {
  creatorId: Scalars['String']['output'];
  creatorName: Scalars['String']['output'];
  messagesRevenue?: Maybe<Scalars['Float']['output']>;
  newSubs?: Maybe<Scalars['Int']['output']>;
  newSubsRevenue?: Maybe<Scalars['Float']['output']>;
  openChats?: Maybe<Scalars['Float']['output']>;
  recSubsRevenue?: Maybe<Scalars['Float']['output']>;
  sellingChats?: Maybe<Scalars['Float']['output']>;
  textingRation?: Maybe<Scalars['Float']['output']>;
  tipsRevenue?: Maybe<Scalars['Float']['output']>;
  totalRevenue?: Maybe<Scalars['Float']['output']>;
};

export type GetOverallStatisticInput = {
  creatorIds: Array<Scalars['String']['input']>;
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type GetOverallStatisticResponse = {
  id?: Maybe<Scalars['String']['output']>;
  incomeInfo?: Maybe<IncomeInfo>;
  totalEarnings?: Maybe<Array<Maybe<Chart>>>;
  totalNewSubs?: Maybe<CountChartStatistic>;
  totalPurchases?: Maybe<CountChartStatistic>;
  totalTurnover?: Maybe<CountChartStatistic>;
};

export type GetPpvTrackingFolderInput = {
  creatorId: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['Date']['input']>;
  folderId: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type GetPpvTrackingFolderMessagesInput = {
  creatorId: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['Date']['input']>;
  folderId?: InputMaybe<Scalars['String']['input']>;
  ppvId: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type GetPreferencesByChatterIdExtensionInput = {
  chatterId: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
};

export type GetPreferencesByChatterIdExtensionResponse = {
  chatter?: Maybe<CreatorWithoutPreferences>;
  preferences?: Maybe<Array<Maybe<Preferences>>>;
};

export type GetUserByTokenResponse = {
  creators?: Maybe<Array<Maybe<CreatorForUser>>>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserDto>;
};

export type IncomeInfo = {
  messages?: Maybe<Scalars['Float']['output']>;
  subscription?: Maybe<Scalars['Float']['output']>;
  tips?: Maybe<Scalars['Float']['output']>;
};

export type Keystrokes = {
  chart?: Maybe<Array<Maybe<SentKeystrokesChart>>>;
  count?: Maybe<Scalars['Int']['output']>;
};

export enum License {
  Advance = 'ADVANCE',
  Base = 'BASE',
  None = 'NONE',
  Prof = 'PROF'
}

export type LoginExtensionInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
};

export type LoginExtensionResponse = {
  token?: Maybe<Scalars['String']['output']>;
  visibilitySettings?: Maybe<Visibility>;
};

export type LoginInput = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MassMessaging = {
  activeSub: Scalars['Boolean']['output'];
  createdBy: Scalars['ID']['output'];
  creatorId: Scalars['ID']['output'];
  endDate?: Maybe<Scalars['Date']['output']>;
  excludeFans: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  neverChatBefore: Scalars['Boolean']['output'];
  startDate?: Maybe<Scalars['Date']['output']>;
  status: Scalars['Boolean']['output'];
};

export type MassMessagingCreate = {
  activeSub?: InputMaybe<Scalars['Boolean']['input']>;
  creatorId: Scalars['ID']['input'];
  endDate?: InputMaybe<Scalars['Date']['input']>;
  excludeFans?: InputMaybe<Scalars['Int']['input']>;
  neverChatBefore?: InputMaybe<Scalars['Boolean']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MassMessagingMessage = {
  fallbackName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  massMess: Scalars['ID']['output'];
  media?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  text: Scalars['String']['output'];
};

export type MassMessagingMessageForMessaging = {
  fallbackName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  media?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  text: Scalars['String']['output'];
};

export type MassMessagingMessageResponse = {
  massMessage?: Maybe<MassMessagingMessage>;
  message?: Maybe<Scalars['String']['output']>;
};

export type MassMessagingResponse = {
  massMessaging?: Maybe<MassMessaging>;
  message?: Maybe<Scalars['String']['output']>;
};

export type MassMessagingWithMessages = {
  activeSub: Scalars['Boolean']['output'];
  createdBy: Scalars['ID']['output'];
  creatorId: Scalars['ID']['output'];
  endDate?: Maybe<Scalars['Date']['output']>;
  excludeFans: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  massMessages?: Maybe<Array<Maybe<MassMessagingMessageForMessaging>>>;
  neverChatBefore: Scalars['Boolean']['output'];
  startDate?: Maybe<Scalars['Date']['output']>;
  status: Scalars['Boolean']['output'];
};

export type MassMessagingWithMessagesResponse = {
  massMessaging?: Maybe<MassMessagingWithMessages>;
  message?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  addAUTOProxy?: Maybe<ChooseProxyResponse>;
  addCreator?: Maybe<AddCreatorResponse>;
  addPreferences?: Maybe<PreferencesForChatterId>;
  changeAutoFollow?: Maybe<AutoFollow>;
  changeCreatorAuth?: Maybe<Scalars['String']['output']>;
  changeCreatorAuthByExtension?: Maybe<Scalars['String']['output']>;
  changeCreatorVisibility?: Maybe<VisibilityChangeResponse>;
  changeDisplayColor?: Maybe<DisplayColorResponse>;
  changeDisplaySettings?: Maybe<DisplaySettingsResponse>;
  changeExpiringFans?: Maybe<ExpiringFansResponse>;
  changeExpiringFansMessage?: Maybe<ExpiringFansMessageResponse>;
  changeFanNumbering?: Maybe<FanNumbering>;
  changeLicense?: Maybe<CreatorResponse>;
  changeMassMessage?: Maybe<MassMessagingMessageResponse>;
  changeMassMessaging?: Maybe<MassMessagingResponse>;
  changePPVFollow?: Maybe<ChangePpvFollow>;
  changePPVMessage?: Maybe<PpvMessageResponse>;
  changePassword: Scalars['String']['output'];
  changePromotionReactivator?: Maybe<PromotionReactivator>;
  changeScript?: Maybe<ScriptResponse>;
  changeScriptFolder?: Maybe<ScriptFolderResponse>;
  changeWelcomeMessage?: Maybe<WelcomeMessageResponse>;
  changeWelcomeSettings?: Maybe<WelcomeSettingsResponse>;
  chooseAUTOProxy?: Maybe<ChooseProxyResponse>;
  chooseHTTPProxy?: Maybe<ChooseProxyResponse>;
  chooseNONEProxy?: Maybe<ChooseProxyResponse>;
  createDisplayColor?: Maybe<DisplayColorResponse>;
  createExpiringFansMessage?: Maybe<ExpiringFansMessageResponse>;
  createMassMessage?: Maybe<MassMessagingMessageResponse>;
  createMassMessaging?: Maybe<MassMessagingWithMessagesResponse>;
  createPPVMessage?: Maybe<PpvMessageResponse>;
  createScript?: Maybe<ScriptResponse>;
  createScriptFolder?: Maybe<ScriptFolderResponse>;
  createWelcomeMessage?: Maybe<WelcomeMessageResponse>;
  deleteAUTOProxy?: Maybe<Scalars['String']['output']>;
  deleteCreator?: Maybe<CreatorDeleteResponse>;
  deleteDisplayColor?: Maybe<Scalars['String']['output']>;
  deleteExpiringFansMessage?: Maybe<Scalars['String']['output']>;
  deleteMassMessage?: Maybe<Scalars['String']['output']>;
  deletePPVMessage?: Maybe<Scalars['String']['output']>;
  deleteScript?: Maybe<Scalars['String']['output']>;
  deleteScriptFolder?: Maybe<Scalars['String']['output']>;
  deleteWelcomeMessage?: Maybe<Scalars['String']['output']>;
  duplicateMassMessaging?: Maybe<MassMessagingResponse>;
  forgotPassword: Scalars['String']['output'];
  login: RegisterOrLoginResponse;
  loginExtension?: Maybe<LoginExtensionResponse>;
  register: RegisterOrLoginResponse;
  temporarySendWelcomeMessage?: Maybe<Scalars['String']['output']>;
};


export type MutationAddAutoProxyArgs = {
  input?: InputMaybe<AddAutoProxyInput>;
};


export type MutationAddCreatorArgs = {
  link?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddPreferencesArgs = {
  input?: InputMaybe<AddPreferencesInput>;
};


export type MutationChangeAutoFollowArgs = {
  input?: InputMaybe<ChangeAutoFollowInput>;
};


export type MutationChangeCreatorAuthArgs = {
  input?: InputMaybe<ChangeCreatorAuthInput>;
};


export type MutationChangeCreatorAuthByExtensionArgs = {
  input?: InputMaybe<ChangeCreatorAuthInput>;
};


export type MutationChangeCreatorVisibilityArgs = {
  input?: InputMaybe<VisibilityInput>;
};


export type MutationChangeDisplayColorArgs = {
  input: ChangeDisplayColorInput;
};


export type MutationChangeDisplaySettingsArgs = {
  input?: InputMaybe<ChangeDisplaySettingsInput>;
};


export type MutationChangeExpiringFansArgs = {
  input?: InputMaybe<ChangeExpiringFansInput>;
};


export type MutationChangeExpiringFansMessageArgs = {
  input: ChangeExpiringFansMessageInput;
};


export type MutationChangeFanNumberingArgs = {
  input?: InputMaybe<ChangeFanNumberingInput>;
};


export type MutationChangeLicenseArgs = {
  input?: InputMaybe<ChangeLicenseInput>;
};


export type MutationChangeMassMessageArgs = {
  input?: InputMaybe<ChangeMassMessageInput>;
};


export type MutationChangeMassMessagingArgs = {
  input?: InputMaybe<ChangeMassMessagingInput>;
};


export type MutationChangePpvFollowArgs = {
  input?: InputMaybe<ChangePpvFollowInput>;
};


export type MutationChangePpvMessageArgs = {
  input?: InputMaybe<ChangePpvMessageInput>;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationChangePromotionReactivatorArgs = {
  input?: InputMaybe<ChangePromotionReactivatorInput>;
};


export type MutationChangeScriptArgs = {
  input?: InputMaybe<UpdateScriptInput>;
};


export type MutationChangeScriptFolderArgs = {
  input?: InputMaybe<UpdateScriptFolderInput>;
};


export type MutationChangeWelcomeMessageArgs = {
  input: ChangeWelcomeMessageInput;
};


export type MutationChangeWelcomeSettingsArgs = {
  input?: InputMaybe<ChangeWelcomeSettingsInput>;
};


export type MutationChooseAutoProxyArgs = {
  input?: InputMaybe<ChooseAutoProxyInput>;
};


export type MutationChooseHttpProxyArgs = {
  input?: InputMaybe<ChooseHttpProxyInput>;
};


export type MutationChooseNoneProxyArgs = {
  creatorId: Scalars['String']['input'];
};


export type MutationCreateDisplayColorArgs = {
  input: CreateDisplayColorInput;
};


export type MutationCreateExpiringFansMessageArgs = {
  input: CreateExpiringFansMessageInput;
};


export type MutationCreateMassMessageArgs = {
  input?: InputMaybe<CreateMassMessageInput>;
};


export type MutationCreateMassMessagingArgs = {
  input?: InputMaybe<CreateMassMessagingInput>;
};


export type MutationCreatePpvMessageArgs = {
  input?: InputMaybe<CreatePpvMessageInput>;
};


export type MutationCreateScriptArgs = {
  input?: InputMaybe<CreateScriptInput>;
};


export type MutationCreateScriptFolderArgs = {
  input?: InputMaybe<CreateScriptFolderInput>;
};


export type MutationCreateWelcomeMessageArgs = {
  input: CreateWelcomeMessageInput;
};


export type MutationDeleteAutoProxyArgs = {
  proxyId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteCreatorArgs = {
  creatorId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteDisplayColorArgs = {
  displayColorId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteExpiringFansMessageArgs = {
  expiringFansMessageId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteMassMessageArgs = {
  massMessageId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeletePpvMessageArgs = {
  pPVMessageId: Scalars['String']['input'];
};


export type MutationDeleteScriptArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteScriptFolderArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteWelcomeMessageArgs = {
  welcomeMessageId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDuplicateMassMessagingArgs = {
  massMessagingId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationForgotPasswordArgs = {
  login: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input?: InputMaybe<LoginInput>;
};


export type MutationLoginExtensionArgs = {
  input: LoginExtensionInput;
};


export type MutationRegisterArgs = {
  input?: InputMaybe<RegisterUserInput>;
};


export type MutationTemporarySendWelcomeMessageArgs = {
  creatorId?: InputMaybe<Scalars['String']['input']>;
};

export enum NameEnum {
  Lower = 'LOWER',
  Proper = 'PROPER',
  Upper = 'UPPER'
}

export type OneChatterInfo = {
  conversionRate?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  keystrokes?: Maybe<Keystrokes>;
  linkClicks?: Maybe<Scalars['Int']['output']>;
  messagesRevenue?: Maybe<Scalars['Float']['output']>;
  newSubs?: Maybe<Scalars['Int']['output']>;
  newSubsRevenue?: Maybe<Scalars['Float']['output']>;
  onlineTime?: Maybe<OnlineTime>;
  openChats?: Maybe<Scalars['Int']['output']>;
  ppvPurchaseRate?: Maybe<PpvPurchaseRate>;
  recSubsRevenue?: Maybe<Scalars['Float']['output']>;
  sellingChats?: Maybe<Scalars['Int']['output']>;
  sentMessages?: Maybe<SentMessages>;
  textingRation?: Maybe<Scalars['Int']['output']>;
  tipsRevenue?: Maybe<Scalars['Float']['output']>;
  totalRevenue?: Maybe<Scalars['Float']['output']>;
  totalSales?: Maybe<TotalSales>;
};

export type OnlineTime = {
  activeTime?: Maybe<Scalars['Int']['output']>;
  inActiveTime?: Maybe<Scalars['Int']['output']>;
  onlineTime?: Maybe<Scalars['Int']['output']>;
};

export type PpvFollow = {
  active: Scalars['Boolean']['output'];
  createdBy: Scalars['ID']['output'];
  creatorId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  include: Scalars['Boolean']['output'];
  time: Scalars['Int']['output'];
};

export type PpvMessage = {
  creatorId: Scalars['ID']['output'];
  fallbackName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  media?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  text: Scalars['String']['output'];
};

export type PpvMessageResponse = {
  message?: Maybe<Scalars['String']['output']>;
  pPVMessage?: Maybe<PpvMessage>;
};

export type PpvTrackingFolderMessagesResponse = {
  avgNetPrice?: Maybe<Scalars['Float']['output']>;
  bought?: Maybe<Scalars['Int']['output']>;
  messages?: Maybe<Array<Maybe<PpvTrackingMessage>>>;
  netRevenue?: Maybe<Scalars['Float']['output']>;
  purchaseRate?: Maybe<Scalars['Int']['output']>;
  sent?: Maybe<Scalars['Int']['output']>;
};

export type PpvTrackingFolderResponse = {
  name?: Maybe<Scalars['String']['output']>;
  ppvFolders?: Maybe<Array<Maybe<PpvFolder>>>;
  purchaseRate?: Maybe<Scalars['Int']['output']>;
  purchases?: Maybe<Scalars['Int']['output']>;
  revenue?: Maybe<Scalars['Float']['output']>;
};

export type PpvTrackingResponse = {
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  purchaseRate?: Maybe<Scalars['Int']['output']>;
  purchases?: Maybe<Scalars['Int']['output']>;
  revenue?: Maybe<Scalars['Float']['output']>;
};

export type PpvFolder = {
  avgNetPrice?: Maybe<Scalars['Float']['output']>;
  bought?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  netRevenue?: Maybe<Scalars['Float']['output']>;
  ppvId?: Maybe<Scalars['String']['output']>;
  purchaseRate?: Maybe<Scalars['Int']['output']>;
  sent?: Maybe<Scalars['Int']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export type PpvPurchaseRate = {
  chart?: Maybe<Array<Maybe<PpvPurchaseRateChart>>>;
  percent?: Maybe<Scalars['Int']['output']>;
};

export type PpvTrackingMessage = {
  messageId?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  purchased?: Maybe<Scalars['Boolean']['output']>;
  sender?: Maybe<Scalars['String']['output']>;
  sentAt?: Maybe<Scalars['Date']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export type Preferences = {
  subscriberId: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type PreferencesForChatterId = {
  message?: Maybe<Scalars['String']['output']>;
  preferences?: Maybe<Array<Maybe<Preferences>>>;
};

export type PromotionReactivator = {
  active: Scalars['Boolean']['output'];
  createdBy: Scalars['ID']['output'];
  creatorId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  period: Scalars['Int']['output'];
};

export type Proxy = {
  country?: Maybe<Scalars['String']['output']>;
  creatorId?: Maybe<Scalars['ID']['output']>;
  host?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  password?: Maybe<Scalars['String']['output']>;
  port?: Maybe<Scalars['String']['output']>;
  proxyType: ProxyType;
  userName?: Maybe<Scalars['String']['output']>;
};

export type ProxyForCreator = {
  country?: Maybe<Scalars['String']['output']>;
  host?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  password?: Maybe<Scalars['String']['output']>;
  port?: Maybe<Scalars['String']['output']>;
  proxyType: ProxyType;
  userName?: Maybe<Scalars['String']['output']>;
};

export enum ProxyType {
  Auto = 'AUTO',
  Http = 'HTTP',
  None = 'NONE'
}

export type Query = {
  getAllDisplayColors?: Maybe<Array<Maybe<DisplayColor>>>;
  getAllExpiringFansMessages?: Maybe<Array<Maybe<ExpiringFansMessage>>>;
  getAllMassMessaging?: Maybe<Array<Maybe<MassMessagingWithMessages>>>;
  getAllMessages?: Maybe<Array<Maybe<MassMessagingMessage>>>;
  getAllPPVMessage?: Maybe<Array<Maybe<PpvMessage>>>;
  getAllWelcomeMessage?: Maybe<Array<Maybe<WelcomeMessage>>>;
  getAutoFollow?: Maybe<AutoFollow>;
  getAvailableCountries?: Maybe<Array<Maybe<CountryMap>>>;
  getChattersTracking?: Maybe<ChatterTracking>;
  getCreatorAuth?: Maybe<CreatorAuth>;
  getCreatorScriptFolders?: Maybe<Array<Maybe<ScriptFoldersWithScripts>>>;
  getCreatorStatistic?: Maybe<Statistic>;
  getCreatorVisibility?: Maybe<VisibilityChangeResponse>;
  getDetailedStatistic?: Maybe<Array<Maybe<DetailedStatisticResponse>>>;
  getDisplaySettings?: Maybe<DisplaySettings>;
  getExpiringFans?: Maybe<ExpiringFans>;
  getFanNumbering?: Maybe<FanNumbering>;
  getOneChatterTracking?: Maybe<OneChatterInfo>;
  getOneDisplayColor?: Maybe<DisplayColor>;
  getOneExpiringFansMessage?: Maybe<ExpiringFansMessage>;
  getOneMassMessage?: Maybe<MassMessagingMessage>;
  getOneMassMessaging?: Maybe<MassMessaging>;
  getOnePPVMessage?: Maybe<PpvMessage>;
  getOneWelcomeMessage?: Maybe<WelcomeMessage>;
  getOverallDetailedComparison?: Maybe<Array<Maybe<GetOverallDetailedComparisonResponse>>>;
  getOverallStatistic?: Maybe<GetOverallStatisticResponse>;
  getPPVFollow?: Maybe<PpvFollow>;
  getPPVTracking?: Maybe<Array<Maybe<PpvTrackingResponse>>>;
  getPPVTrackingFolder?: Maybe<PpvTrackingFolderResponse>;
  getPPVTrackingFolderMessages?: Maybe<PpvTrackingFolderMessagesResponse>;
  getPreferencesByChatterIdExtension?: Maybe<GetPreferencesByChatterIdExtensionResponse>;
  getPromotionReactivator?: Maybe<PromotionReactivator>;
  getScriptById?: Maybe<Script>;
  getScriptFolderById?: Maybe<ScriptFolder>;
  getUserByToken?: Maybe<GetUserByTokenResponse>;
  getUserCreatorsProxy?: Maybe<Array<Maybe<CreatorWithProxy>>>;
  getVisibilitySettingByTokenExtension?: Maybe<VisibilitySettingByExtension>;
  getWelcomeSettings?: Maybe<WelcomeSettings>;
  scrapeAvatarAndNameForCreator?: Maybe<ResponseAvatarAndName>;
  scrapePublicOnlyFansPhoto?: Maybe<Scalars['String']['output']>;
  scraperAPIAvatarAndNameForCreator?: Maybe<ResponseAvatarAndName>;
};


export type QueryGetAllDisplayColorsArgs = {
  creatorId: Scalars['String']['input'];
};


export type QueryGetAllExpiringFansMessagesArgs = {
  creatorId: Scalars['String']['input'];
};


export type QueryGetAllMassMessagingArgs = {
  creatorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllMessagesArgs = {
  massMessId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllPpvMessageArgs = {
  creatorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllWelcomeMessageArgs = {
  creatorId: Scalars['String']['input'];
};


export type QueryGetAutoFollowArgs = {
  creatorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetChattersTrackingArgs = {
  input?: InputMaybe<GetDatesCreatorIdInput>;
};


export type QueryGetCreatorAuthArgs = {
  user_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCreatorScriptFoldersArgs = {
  creatorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCreatorStatisticArgs = {
  input?: InputMaybe<GetCreatorStatisticInput>;
};


export type QueryGetCreatorVisibilityArgs = {
  creatorId: Scalars['String']['input'];
};


export type QueryGetDetailedStatisticArgs = {
  input?: InputMaybe<GetDetailedStatisticInput>;
};


export type QueryGetDisplaySettingsArgs = {
  creatorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetExpiringFansArgs = {
  creatorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetFanNumberingArgs = {
  creatorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOneChatterTrackingArgs = {
  input?: InputMaybe<GetOneChatterTrackingInput>;
};


export type QueryGetOneDisplayColorArgs = {
  displayColorId: Scalars['String']['input'];
};


export type QueryGetOneExpiringFansMessageArgs = {
  expiringFansMessageId: Scalars['String']['input'];
};


export type QueryGetOneMassMessageArgs = {
  massMessageId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOneMassMessagingArgs = {
  massMessagingId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOnePpvMessageArgs = {
  pPVMessageId: Scalars['String']['input'];
};


export type QueryGetOneWelcomeMessageArgs = {
  welcomeMessageId: Scalars['String']['input'];
};


export type QueryGetOverallDetailedComparisonArgs = {
  input?: InputMaybe<GetOverallStatisticInput>;
};


export type QueryGetOverallStatisticArgs = {
  input?: InputMaybe<GetOverallStatisticInput>;
};


export type QueryGetPpvFollowArgs = {
  creatorId: Scalars['String']['input'];
};


export type QueryGetPpvTrackingArgs = {
  input?: InputMaybe<GetDatesCreatorIdInput>;
};


export type QueryGetPpvTrackingFolderArgs = {
  input?: InputMaybe<GetPpvTrackingFolderInput>;
};


export type QueryGetPpvTrackingFolderMessagesArgs = {
  input?: InputMaybe<GetPpvTrackingFolderMessagesInput>;
};


export type QueryGetPreferencesByChatterIdExtensionArgs = {
  input?: InputMaybe<GetPreferencesByChatterIdExtensionInput>;
};


export type QueryGetPromotionReactivatorArgs = {
  creatorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetScriptByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetScriptFolderByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetVisibilitySettingByTokenExtensionArgs = {
  user_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetWelcomeSettingsArgs = {
  creatorId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryScrapeAvatarAndNameForCreatorArgs = {
  url: Scalars['String']['input'];
};


export type QueryScrapePublicOnlyFansPhotoArgs = {
  url: Scalars['String']['input'];
};


export type QueryScraperApiAvatarAndNameForCreatorArgs = {
  id: Scalars['String']['input'];
};

export type ReceivedHistory = {
  date?: Maybe<Scalars['Date']['output']>;
  received?: Maybe<Scalars['Float']['output']>;
};

export type RegisterOrLoginResponse = {
  creators?: Maybe<Array<Maybe<CreatorForUser>>>;
  message: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<UserDto>;
};

export type RegisterUserInput = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ResetPassword = {
  expire?: Maybe<Scalars['String']['output']>;
  resetCode?: Maybe<Scalars['Int']['output']>;
};

export type ResponseAvatarAndName = {
  name?: Maybe<Scalars['String']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
};

export type RevenueChart = {
  name?: Maybe<Scalars['String']['output']>;
  receivedHistory?: Maybe<Array<Maybe<ReceivedHistory>>>;
};

export type Script = {
  customName: NameEnum;
  fallbackName: Scalars['String']['output'];
  fanName: NameEnum;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  number: Scalars['Int']['output'];
  scriptFolder: Scalars['ID']['output'];
  text: Scalars['String']['output'];
};

export type ScriptFolder = {
  creatorId: Scalars['ID']['output'];
  folderName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  number: Scalars['Int']['output'];
};

export type ScriptFolderResponse = {
  message: Scalars['String']['output'];
  scriptFolder?: Maybe<ScriptFolder>;
};

export type ScriptFolderWithScript = {
  creatorId: Scalars['ID']['output'];
  folderName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  number: Scalars['Int']['output'];
  scripts?: Maybe<Array<Maybe<ScriptForFolder>>>;
};

export type ScriptFoldersWithScripts = {
  scriptFolders?: Maybe<ScriptFolderWithScript>;
};

export type ScriptForFolder = {
  fallbackName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  number: Scalars['Int']['output'];
  text: Scalars['String']['output'];
};

export type ScriptResponse = {
  message?: Maybe<Scalars['String']['output']>;
  script?: Maybe<Script>;
};

export type SentMessages = {
  chart?: Maybe<Array<Maybe<SentMessagesChart>>>;
  count?: Maybe<Scalars['Int']['output']>;
};

export type Statistic = {
  bestDay?: Maybe<Array<Maybe<Best>>>;
  bestHour?: Maybe<Array<Maybe<Best>>>;
  composition?: Maybe<Array<Maybe<Composition>>>;
  subscription?: Maybe<StatisticSection>;
  topFans?: Maybe<Array<Maybe<TopFan>>>;
  turnover?: Maybe<StatisticSection>;
};

export type StatisticSection = {
  chart?: Maybe<Array<Maybe<Chart>>>;
  total?: Maybe<Scalars['Float']['output']>;
};

export type TopFan = {
  avatarUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type TotalSales = {
  chart?: Maybe<Array<Maybe<TotalSalesChart>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type UpdateScriptFolderInput = {
  creatorId: Scalars['ID']['input'];
  folderName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateScriptInput = {
  customName?: InputMaybe<NameEnum>;
  fallbackName?: InputMaybe<Scalars['String']['input']>;
  fanName?: InputMaybe<NameEnum>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  scriptFolder?: InputMaybe<Scalars['ID']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  passwordHash: Scalars['String']['output'];
  resetPassword?: Maybe<ResetPassword>;
  role?: Maybe<UserRole>;
};

export type UserDto = {
  email: Scalars['String']['output'];
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  role?: Maybe<UserRole>;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Visibility = {
  creatorId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  showFanDetails?: Maybe<Scalars['Boolean']['output']>;
  showFanSpending?: Maybe<Scalars['Boolean']['output']>;
  showGlobalInfo?: Maybe<Scalars['Boolean']['output']>;
  showScripts?: Maybe<Scalars['Boolean']['output']>;
};

export type VisibilityChangeResponse = {
  message?: Maybe<Scalars['String']['output']>;
  visibility?: Maybe<Visibility>;
};

export type VisibilityInput = {
  creatorId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  showFanDetails?: InputMaybe<Scalars['Boolean']['input']>;
  showFanSpending?: InputMaybe<Scalars['Boolean']['input']>;
  showGlobalInfo?: InputMaybe<Scalars['Boolean']['input']>;
  showScripts?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VisibilitySettingByExtension = {
  user_id?: Maybe<Scalars['String']['output']>;
  visibilitySetting?: Maybe<Visibility>;
};

export type WelcomeMessage = {
  fallbackName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  media?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  text: Scalars['String']['output'];
  welcomeSettings: Scalars['ID']['output'];
};

export type WelcomeMessageResponse = {
  message?: Maybe<Scalars['String']['output']>;
  welcomeMessage?: Maybe<WelcomeMessage>;
};

export type WelcomeSettings = {
  active: Scalars['Boolean']['output'];
  createdBy: Scalars['ID']['output'];
  creatorId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  time: Scalars['Int']['output'];
};

export type WelcomeSettingsResponse = {
  message?: Maybe<Scalars['String']['output']>;
  welcomeSettings?: Maybe<WelcomeSettings>;
};

export type AddAutoProxyInput = {
  country: Scalars['String']['input'];
  host: Scalars['String']['input'];
  password: Scalars['String']['input'];
  port: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type ChangeLicenseInput = {
  creatorId: Scalars['ID']['input'];
  license?: InputMaybe<License>;
};

export type ChangePpvFollow = {
  message?: Maybe<Scalars['String']['output']>;
  pPVFollow?: Maybe<PpvFollow>;
};

export type ChangePasswordInput = {
  login: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  resetCode: Scalars['Int']['input'];
};

export type ChooseProxyResponse = {
  message?: Maybe<Scalars['String']['output']>;
  proxy?: Maybe<Proxy>;
};

export type PpvPurchaseRateChart = {
  boughtPPV?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  sendPPV?: Maybe<Scalars['Int']['output']>;
};

export type SentKeystrokesChart = {
  count?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
};

export type SentMessagesChart = {
  count?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
};

export type TotalSalesChart = {
  date?: Maybe<Scalars['String']['output']>;
  ppvRevenue?: Maybe<Scalars['Int']['output']>;
  tipsRevenue?: Maybe<Scalars['Int']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddCreatorResponse: ResolverTypeWrapper<AddCreatorResponse>;
  AddPreferencesInput: AddPreferencesInput;
  AmountStats: ResolverTypeWrapper<AmountStats>;
  AutoFollow: ResolverTypeWrapper<AutoFollow>;
  Best: ResolverTypeWrapper<Best>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ChangeAutoFollowInput: ChangeAutoFollowInput;
  ChangeCreatorAuthInput: ChangeCreatorAuthInput;
  ChangeDisplayColorInput: ChangeDisplayColorInput;
  ChangeDisplaySettingsInput: ChangeDisplaySettingsInput;
  ChangeExpiringFansInput: ChangeExpiringFansInput;
  ChangeExpiringFansMessageInput: ChangeExpiringFansMessageInput;
  ChangeFanNumberingInput: ChangeFanNumberingInput;
  ChangeMassMessageInput: ChangeMassMessageInput;
  ChangeMassMessagingInput: ChangeMassMessagingInput;
  ChangePPVFollowInput: ChangePpvFollowInput;
  ChangePPVMessageInput: ChangePpvMessageInput;
  ChangePromotionReactivatorInput: ChangePromotionReactivatorInput;
  ChangeWelcomeMessageInput: ChangeWelcomeMessageInput;
  ChangeWelcomeSettingsInput: ChangeWelcomeSettingsInput;
  Chart: ResolverTypeWrapper<Chart>;
  ChatterDetailed: ResolverTypeWrapper<ChatterDetailed>;
  ChatterShort: ResolverTypeWrapper<ChatterShort>;
  ChatterTracking: ResolverTypeWrapper<ChatterTracking>;
  ChooseAUTOProxyInput: ChooseAutoProxyInput;
  ChooseHTTPProxyInput: ChooseHttpProxyInput;
  Composition: ResolverTypeWrapper<Composition>;
  CountChartStatistic: ResolverTypeWrapper<CountChartStatistic>;
  CountryMap: ResolverTypeWrapper<CountryMap>;
  CreateDisplayColorInput: CreateDisplayColorInput;
  CreateExpiringFansMessageInput: CreateExpiringFansMessageInput;
  CreateMassMessageInput: CreateMassMessageInput;
  CreateMassMessageInputForMessaging: CreateMassMessageInputForMessaging;
  CreateMassMessagingInput: CreateMassMessagingInput;
  CreatePPVMessageInput: CreatePpvMessageInput;
  CreateScriptFolderInput: CreateScriptFolderInput;
  CreateScriptInput: CreateScriptInput;
  CreateWelcomeMessageInput: CreateWelcomeMessageInput;
  Creator: ResolverTypeWrapper<Creator>;
  CreatorAuth: ResolverTypeWrapper<CreatorAuth>;
  CreatorAuthInput: CreatorAuthInput;
  CreatorDeleteResponse: ResolverTypeWrapper<CreatorDeleteResponse>;
  CreatorForAddCreatorResponse: ResolverTypeWrapper<CreatorForAddCreatorResponse>;
  CreatorForUser: ResolverTypeWrapper<CreatorForUser>;
  CreatorResponse: ResolverTypeWrapper<CreatorResponse>;
  CreatorWithProxy: ResolverTypeWrapper<CreatorWithProxy>;
  CreatorWithoutPreferences: ResolverTypeWrapper<CreatorWithoutPreferences>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DetailedStatisticResponse: ResolverTypeWrapper<DetailedStatisticResponse>;
  DisplayColor: ResolverTypeWrapper<DisplayColor>;
  DisplayColorResponse: ResolverTypeWrapper<DisplayColorResponse>;
  DisplaySettings: ResolverTypeWrapper<DisplaySettings>;
  DisplaySettingsResponse: ResolverTypeWrapper<DisplaySettingsResponse>;
  ExpiringFans: ResolverTypeWrapper<ExpiringFans>;
  ExpiringFansMessage: ResolverTypeWrapper<ExpiringFansMessage>;
  ExpiringFansMessageResponse: ResolverTypeWrapper<ExpiringFansMessageResponse>;
  ExpiringFansResponse: ResolverTypeWrapper<ExpiringFansResponse>;
  FanNumbering: ResolverTypeWrapper<FanNumbering>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GetChattersTrackingInput: GetChattersTrackingInput;
  GetCreatorStatisticInput: GetCreatorStatisticInput;
  GetDatesCreatorIdInput: GetDatesCreatorIdInput;
  GetDetailedStatisticInput: GetDetailedStatisticInput;
  GetOneChatterTrackingInput: GetOneChatterTrackingInput;
  GetOverallDetailedComparisonResponse: ResolverTypeWrapper<GetOverallDetailedComparisonResponse>;
  GetOverallStatisticInput: GetOverallStatisticInput;
  GetOverallStatisticResponse: ResolverTypeWrapper<GetOverallStatisticResponse>;
  GetPPVTrackingFolderInput: GetPpvTrackingFolderInput;
  GetPPVTrackingFolderMessagesInput: GetPpvTrackingFolderMessagesInput;
  GetPreferencesByChatterIdExtensionInput: GetPreferencesByChatterIdExtensionInput;
  GetPreferencesByChatterIdExtensionResponse: ResolverTypeWrapper<GetPreferencesByChatterIdExtensionResponse>;
  GetUserByTokenResponse: ResolverTypeWrapper<GetUserByTokenResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  IncomeInfo: ResolverTypeWrapper<IncomeInfo>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Keystrokes: ResolverTypeWrapper<Keystrokes>;
  License: License;
  LoginExtensionInput: LoginExtensionInput;
  LoginExtensionResponse: ResolverTypeWrapper<LoginExtensionResponse>;
  LoginInput: LoginInput;
  MassMessaging: ResolverTypeWrapper<MassMessaging>;
  MassMessagingCreate: MassMessagingCreate;
  MassMessagingMessage: ResolverTypeWrapper<MassMessagingMessage>;
  MassMessagingMessageForMessaging: ResolverTypeWrapper<MassMessagingMessageForMessaging>;
  MassMessagingMessageResponse: ResolverTypeWrapper<MassMessagingMessageResponse>;
  MassMessagingResponse: ResolverTypeWrapper<MassMessagingResponse>;
  MassMessagingWithMessages: ResolverTypeWrapper<MassMessagingWithMessages>;
  MassMessagingWithMessagesResponse: ResolverTypeWrapper<MassMessagingWithMessagesResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  NameEnum: NameEnum;
  OneChatterInfo: ResolverTypeWrapper<OneChatterInfo>;
  OnlineTime: ResolverTypeWrapper<OnlineTime>;
  PPVFollow: ResolverTypeWrapper<PpvFollow>;
  PPVMessage: ResolverTypeWrapper<PpvMessage>;
  PPVMessageResponse: ResolverTypeWrapper<PpvMessageResponse>;
  PPVTrackingFolderMessagesResponse: ResolverTypeWrapper<PpvTrackingFolderMessagesResponse>;
  PPVTrackingFolderResponse: ResolverTypeWrapper<PpvTrackingFolderResponse>;
  PPVTrackingResponse: ResolverTypeWrapper<PpvTrackingResponse>;
  PpvFolder: ResolverTypeWrapper<PpvFolder>;
  PpvPurchaseRate: ResolverTypeWrapper<PpvPurchaseRate>;
  PpvTrackingMessage: ResolverTypeWrapper<PpvTrackingMessage>;
  Preferences: ResolverTypeWrapper<Preferences>;
  PreferencesForChatterId: ResolverTypeWrapper<PreferencesForChatterId>;
  PromotionReactivator: ResolverTypeWrapper<PromotionReactivator>;
  Proxy: ResolverTypeWrapper<Proxy>;
  ProxyForCreator: ResolverTypeWrapper<ProxyForCreator>;
  ProxyType: ProxyType;
  Query: ResolverTypeWrapper<{}>;
  ReceivedHistory: ResolverTypeWrapper<ReceivedHistory>;
  RegisterOrLoginResponse: ResolverTypeWrapper<RegisterOrLoginResponse>;
  RegisterUserInput: RegisterUserInput;
  ResetPassword: ResolverTypeWrapper<ResetPassword>;
  ResponseAvatarAndName: ResolverTypeWrapper<ResponseAvatarAndName>;
  RevenueChart: ResolverTypeWrapper<RevenueChart>;
  Script: ResolverTypeWrapper<Script>;
  ScriptFolder: ResolverTypeWrapper<ScriptFolder>;
  ScriptFolderResponse: ResolverTypeWrapper<ScriptFolderResponse>;
  ScriptFolderWithScript: ResolverTypeWrapper<ScriptFolderWithScript>;
  ScriptFoldersWithScripts: ResolverTypeWrapper<ScriptFoldersWithScripts>;
  ScriptForFolder: ResolverTypeWrapper<ScriptForFolder>;
  ScriptResponse: ResolverTypeWrapper<ScriptResponse>;
  SentMessages: ResolverTypeWrapper<SentMessages>;
  Statistic: ResolverTypeWrapper<Statistic>;
  StatisticSection: ResolverTypeWrapper<StatisticSection>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TopFan: ResolverTypeWrapper<TopFan>;
  TotalSales: ResolverTypeWrapper<TotalSales>;
  UpdateScriptFolderInput: UpdateScriptFolderInput;
  UpdateScriptInput: UpdateScriptInput;
  User: ResolverTypeWrapper<User>;
  UserDTO: ResolverTypeWrapper<UserDto>;
  UserRole: UserRole;
  Visibility: ResolverTypeWrapper<Visibility>;
  VisibilityChangeResponse: ResolverTypeWrapper<VisibilityChangeResponse>;
  VisibilityInput: VisibilityInput;
  VisibilitySettingByExtension: ResolverTypeWrapper<VisibilitySettingByExtension>;
  WelcomeMessage: ResolverTypeWrapper<WelcomeMessage>;
  WelcomeMessageResponse: ResolverTypeWrapper<WelcomeMessageResponse>;
  WelcomeSettings: ResolverTypeWrapper<WelcomeSettings>;
  WelcomeSettingsResponse: ResolverTypeWrapper<WelcomeSettingsResponse>;
  addAUTOProxyInput: AddAutoProxyInput;
  changeLicenseInput: ChangeLicenseInput;
  changePPVFollow: ResolverTypeWrapper<ChangePpvFollow>;
  changePasswordInput: ChangePasswordInput;
  chooseProxyResponse: ResolverTypeWrapper<ChooseProxyResponse>;
  ppvPurchaseRateChart: ResolverTypeWrapper<PpvPurchaseRateChart>;
  sentKeystrokesChart: ResolverTypeWrapper<SentKeystrokesChart>;
  sentMessagesChart: ResolverTypeWrapper<SentMessagesChart>;
  totalSalesChart: ResolverTypeWrapper<TotalSalesChart>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddCreatorResponse: AddCreatorResponse;
  AddPreferencesInput: AddPreferencesInput;
  AmountStats: AmountStats;
  AutoFollow: AutoFollow;
  Best: Best;
  Boolean: Scalars['Boolean']['output'];
  ChangeAutoFollowInput: ChangeAutoFollowInput;
  ChangeCreatorAuthInput: ChangeCreatorAuthInput;
  ChangeDisplayColorInput: ChangeDisplayColorInput;
  ChangeDisplaySettingsInput: ChangeDisplaySettingsInput;
  ChangeExpiringFansInput: ChangeExpiringFansInput;
  ChangeExpiringFansMessageInput: ChangeExpiringFansMessageInput;
  ChangeFanNumberingInput: ChangeFanNumberingInput;
  ChangeMassMessageInput: ChangeMassMessageInput;
  ChangeMassMessagingInput: ChangeMassMessagingInput;
  ChangePPVFollowInput: ChangePpvFollowInput;
  ChangePPVMessageInput: ChangePpvMessageInput;
  ChangePromotionReactivatorInput: ChangePromotionReactivatorInput;
  ChangeWelcomeMessageInput: ChangeWelcomeMessageInput;
  ChangeWelcomeSettingsInput: ChangeWelcomeSettingsInput;
  Chart: Chart;
  ChatterDetailed: ChatterDetailed;
  ChatterShort: ChatterShort;
  ChatterTracking: ChatterTracking;
  ChooseAUTOProxyInput: ChooseAutoProxyInput;
  ChooseHTTPProxyInput: ChooseHttpProxyInput;
  Composition: Composition;
  CountChartStatistic: CountChartStatistic;
  CountryMap: CountryMap;
  CreateDisplayColorInput: CreateDisplayColorInput;
  CreateExpiringFansMessageInput: CreateExpiringFansMessageInput;
  CreateMassMessageInput: CreateMassMessageInput;
  CreateMassMessageInputForMessaging: CreateMassMessageInputForMessaging;
  CreateMassMessagingInput: CreateMassMessagingInput;
  CreatePPVMessageInput: CreatePpvMessageInput;
  CreateScriptFolderInput: CreateScriptFolderInput;
  CreateScriptInput: CreateScriptInput;
  CreateWelcomeMessageInput: CreateWelcomeMessageInput;
  Creator: Creator;
  CreatorAuth: CreatorAuth;
  CreatorAuthInput: CreatorAuthInput;
  CreatorDeleteResponse: CreatorDeleteResponse;
  CreatorForAddCreatorResponse: CreatorForAddCreatorResponse;
  CreatorForUser: CreatorForUser;
  CreatorResponse: CreatorResponse;
  CreatorWithProxy: CreatorWithProxy;
  CreatorWithoutPreferences: CreatorWithoutPreferences;
  Date: Scalars['Date']['output'];
  DetailedStatisticResponse: DetailedStatisticResponse;
  DisplayColor: DisplayColor;
  DisplayColorResponse: DisplayColorResponse;
  DisplaySettings: DisplaySettings;
  DisplaySettingsResponse: DisplaySettingsResponse;
  ExpiringFans: ExpiringFans;
  ExpiringFansMessage: ExpiringFansMessage;
  ExpiringFansMessageResponse: ExpiringFansMessageResponse;
  ExpiringFansResponse: ExpiringFansResponse;
  FanNumbering: FanNumbering;
  Float: Scalars['Float']['output'];
  GetChattersTrackingInput: GetChattersTrackingInput;
  GetCreatorStatisticInput: GetCreatorStatisticInput;
  GetDatesCreatorIdInput: GetDatesCreatorIdInput;
  GetDetailedStatisticInput: GetDetailedStatisticInput;
  GetOneChatterTrackingInput: GetOneChatterTrackingInput;
  GetOverallDetailedComparisonResponse: GetOverallDetailedComparisonResponse;
  GetOverallStatisticInput: GetOverallStatisticInput;
  GetOverallStatisticResponse: GetOverallStatisticResponse;
  GetPPVTrackingFolderInput: GetPpvTrackingFolderInput;
  GetPPVTrackingFolderMessagesInput: GetPpvTrackingFolderMessagesInput;
  GetPreferencesByChatterIdExtensionInput: GetPreferencesByChatterIdExtensionInput;
  GetPreferencesByChatterIdExtensionResponse: GetPreferencesByChatterIdExtensionResponse;
  GetUserByTokenResponse: GetUserByTokenResponse;
  ID: Scalars['ID']['output'];
  IncomeInfo: IncomeInfo;
  Int: Scalars['Int']['output'];
  Keystrokes: Keystrokes;
  LoginExtensionInput: LoginExtensionInput;
  LoginExtensionResponse: LoginExtensionResponse;
  LoginInput: LoginInput;
  MassMessaging: MassMessaging;
  MassMessagingCreate: MassMessagingCreate;
  MassMessagingMessage: MassMessagingMessage;
  MassMessagingMessageForMessaging: MassMessagingMessageForMessaging;
  MassMessagingMessageResponse: MassMessagingMessageResponse;
  MassMessagingResponse: MassMessagingResponse;
  MassMessagingWithMessages: MassMessagingWithMessages;
  MassMessagingWithMessagesResponse: MassMessagingWithMessagesResponse;
  Mutation: {};
  OneChatterInfo: OneChatterInfo;
  OnlineTime: OnlineTime;
  PPVFollow: PpvFollow;
  PPVMessage: PpvMessage;
  PPVMessageResponse: PpvMessageResponse;
  PPVTrackingFolderMessagesResponse: PpvTrackingFolderMessagesResponse;
  PPVTrackingFolderResponse: PpvTrackingFolderResponse;
  PPVTrackingResponse: PpvTrackingResponse;
  PpvFolder: PpvFolder;
  PpvPurchaseRate: PpvPurchaseRate;
  PpvTrackingMessage: PpvTrackingMessage;
  Preferences: Preferences;
  PreferencesForChatterId: PreferencesForChatterId;
  PromotionReactivator: PromotionReactivator;
  Proxy: Proxy;
  ProxyForCreator: ProxyForCreator;
  Query: {};
  ReceivedHistory: ReceivedHistory;
  RegisterOrLoginResponse: RegisterOrLoginResponse;
  RegisterUserInput: RegisterUserInput;
  ResetPassword: ResetPassword;
  ResponseAvatarAndName: ResponseAvatarAndName;
  RevenueChart: RevenueChart;
  Script: Script;
  ScriptFolder: ScriptFolder;
  ScriptFolderResponse: ScriptFolderResponse;
  ScriptFolderWithScript: ScriptFolderWithScript;
  ScriptFoldersWithScripts: ScriptFoldersWithScripts;
  ScriptForFolder: ScriptForFolder;
  ScriptResponse: ScriptResponse;
  SentMessages: SentMessages;
  Statistic: Statistic;
  StatisticSection: StatisticSection;
  String: Scalars['String']['output'];
  TopFan: TopFan;
  TotalSales: TotalSales;
  UpdateScriptFolderInput: UpdateScriptFolderInput;
  UpdateScriptInput: UpdateScriptInput;
  User: User;
  UserDTO: UserDto;
  Visibility: Visibility;
  VisibilityChangeResponse: VisibilityChangeResponse;
  VisibilityInput: VisibilityInput;
  VisibilitySettingByExtension: VisibilitySettingByExtension;
  WelcomeMessage: WelcomeMessage;
  WelcomeMessageResponse: WelcomeMessageResponse;
  WelcomeSettings: WelcomeSettings;
  WelcomeSettingsResponse: WelcomeSettingsResponse;
  addAUTOProxyInput: AddAutoProxyInput;
  changeLicenseInput: ChangeLicenseInput;
  changePPVFollow: ChangePpvFollow;
  changePasswordInput: ChangePasswordInput;
  chooseProxyResponse: ChooseProxyResponse;
  ppvPurchaseRateChart: PpvPurchaseRateChart;
  sentKeystrokesChart: SentKeystrokesChart;
  sentMessagesChart: SentMessagesChart;
  totalSalesChart: TotalSalesChart;
};

export type AddCreatorResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddCreatorResponse'] = ResolversParentTypes['AddCreatorResponse']> = {
  creator?: Resolver<Maybe<ResolversTypes['CreatorForAddCreatorResponse']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AmountStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AmountStats'] = ResolversParentTypes['AmountStats']> = {
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AutoFollowResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoFollow'] = ResolversParentTypes['AutoFollow']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BestResolvers<ContextType = any, ParentType extends ResolversParentTypes['Best'] = ResolversParentTypes['Best']> = {
  average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChartResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chart'] = ResolversParentTypes['Chart']> = {
  count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatterDetailedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatterDetailed'] = ResolversParentTypes['ChatterDetailed']> = {
  activeTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  avgResponse?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  inActiveTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sentMessages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatterShortResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatterShort'] = ResolversParentTypes['ChatterShort']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  received?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatterTrackingResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatterTracking'] = ResolversParentTypes['ChatterTracking']> = {
  chatterTable?: Resolver<Maybe<Array<Maybe<ResolversTypes['ChatterDetailed']>>>, ParentType, ContextType>;
  revenueChart?: Resolver<Maybe<Array<Maybe<ResolversTypes['RevenueChart']>>>, ParentType, ContextType>;
  topChattersChart?: Resolver<Maybe<Array<Maybe<ResolversTypes['ChatterShort']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompositionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Composition'] = ResolversParentTypes['Composition']> = {
  amountStats?: Resolver<Maybe<Array<Maybe<ResolversTypes['AmountStats']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountChartStatisticResolvers<ContextType = any, ParentType extends ResolversParentTypes['CountChartStatistic'] = ResolversParentTypes['CountChartStatistic']> = {
  chart?: Resolver<Maybe<Array<Maybe<ResolversTypes['Chart']>>>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryMapResolvers<ContextType = any, ParentType extends ResolversParentTypes['CountryMap'] = ResolversParentTypes['CountryMap']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Creator'] = ResolversParentTypes['Creator']> = {
  avatarURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creatorAuth?: Resolver<Maybe<ResolversTypes['CreatorAuth']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  license?: Resolver<Maybe<ResolversTypes['License']>, ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preferences?: Resolver<Maybe<Array<Maybe<ResolversTypes['Preferences']>>>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorAuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatorAuth'] = ResolversParentTypes['CreatorAuth']> = {
  cookie?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expiredAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  user_agent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  x_bc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorDeleteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatorDeleteResponse'] = ResolversParentTypes['CreatorDeleteResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorForAddCreatorResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatorForAddCreatorResponse'] = ResolversParentTypes['CreatorForAddCreatorResponse']> = {
  avatarURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creatorAuth?: Resolver<Maybe<ResolversTypes['CreatorAuth']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  license?: Resolver<Maybe<ResolversTypes['License']>, ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  proxy?: Resolver<Maybe<ResolversTypes['ProxyForCreator']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorForUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatorForUser'] = ResolversParentTypes['CreatorForUser']> = {
  avatarURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creatorAuth?: Resolver<Maybe<ResolversTypes['CreatorAuth']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  license?: Resolver<Maybe<ResolversTypes['License']>, ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  proxy?: Resolver<Maybe<ResolversTypes['Proxy']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatorResponse'] = ResolversParentTypes['CreatorResponse']> = {
  creator?: Resolver<Maybe<ResolversTypes['Creator']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorWithProxyResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatorWithProxy'] = ResolversParentTypes['CreatorWithProxy']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  license?: Resolver<Maybe<ResolversTypes['License']>, ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  proxy?: Resolver<Maybe<ResolversTypes['Proxy']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorWithoutPreferencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatorWithoutPreferences'] = ResolversParentTypes['CreatorWithoutPreferences']> = {
  avatarURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creatorAuth?: Resolver<Maybe<ResolversTypes['CreatorAuth']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  license?: Resolver<Maybe<ResolversTypes['License']>, ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DetailedStatisticResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DetailedStatisticResponse'] = ResolversParentTypes['DetailedStatisticResponse']> = {
  conversionRate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  linkClicks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  messagesRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  newSubs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  newSubsRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  openChats?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  recSubsRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sellingChats?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  textingRation?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tipsRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DisplayColorResolvers<ContextType = any, ParentType extends ResolversParentTypes['DisplayColor'] = ResolversParentTypes['DisplayColor']> = {
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inboxColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spend?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DisplayColorResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DisplayColorResponse'] = ResolversParentTypes['DisplayColorResponse']> = {
  displayColor?: Resolver<Maybe<ResolversTypes['DisplayColor']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DisplaySettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DisplaySettings'] = ResolversParentTypes['DisplaySettings']> = {
  audioId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  audioVolume?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  emojiStatus?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  emojis?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DisplaySettingsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DisplaySettingsResponse'] = ResolversParentTypes['DisplaySettingsResponse']> = {
  displaySettings?: Resolver<Maybe<ResolversTypes['DisplaySettings']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExpiringFansResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExpiringFans'] = ResolversParentTypes['ExpiringFans']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messageTiming?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  spendingLimitation?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  timeLimitation?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExpiringFansMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExpiringFansMessage'] = ResolversParentTypes['ExpiringFansMessage']> = {
  expiringFans?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  fallbackName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  media?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExpiringFansMessageResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExpiringFansMessageResponse'] = ResolversParentTypes['ExpiringFansMessageResponse']> = {
  expiringFans?: Resolver<Maybe<ResolversTypes['ExpiringFansMessage']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExpiringFansResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExpiringFansResponse'] = ResolversParentTypes['ExpiringFansResponse']> = {
  expiringFans?: Resolver<Maybe<ResolversTypes['ExpiringFans']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FanNumberingResolvers<ContextType = any, ParentType extends ResolversParentTypes['FanNumbering'] = ResolversParentTypes['FanNumbering']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  numbers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetOverallDetailedComparisonResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetOverallDetailedComparisonResponse'] = ResolversParentTypes['GetOverallDetailedComparisonResponse']> = {
  creatorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creatorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messagesRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  newSubs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  newSubsRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  openChats?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  recSubsRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sellingChats?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  textingRation?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  tipsRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetOverallStatisticResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetOverallStatisticResponse'] = ResolversParentTypes['GetOverallStatisticResponse']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  incomeInfo?: Resolver<Maybe<ResolversTypes['IncomeInfo']>, ParentType, ContextType>;
  totalEarnings?: Resolver<Maybe<Array<Maybe<ResolversTypes['Chart']>>>, ParentType, ContextType>;
  totalNewSubs?: Resolver<Maybe<ResolversTypes['CountChartStatistic']>, ParentType, ContextType>;
  totalPurchases?: Resolver<Maybe<ResolversTypes['CountChartStatistic']>, ParentType, ContextType>;
  totalTurnover?: Resolver<Maybe<ResolversTypes['CountChartStatistic']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetPreferencesByChatterIdExtensionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetPreferencesByChatterIdExtensionResponse'] = ResolversParentTypes['GetPreferencesByChatterIdExtensionResponse']> = {
  chatter?: Resolver<Maybe<ResolversTypes['CreatorWithoutPreferences']>, ParentType, ContextType>;
  preferences?: Resolver<Maybe<Array<Maybe<ResolversTypes['Preferences']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetUserByTokenResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetUserByTokenResponse'] = ResolversParentTypes['GetUserByTokenResponse']> = {
  creators?: Resolver<Maybe<Array<Maybe<ResolversTypes['CreatorForUser']>>>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserDTO']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IncomeInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['IncomeInfo'] = ResolversParentTypes['IncomeInfo']> = {
  messages?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  subscription?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  tips?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeystrokesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Keystrokes'] = ResolversParentTypes['Keystrokes']> = {
  chart?: Resolver<Maybe<Array<Maybe<ResolversTypes['sentKeystrokesChart']>>>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginExtensionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginExtensionResponse'] = ResolversParentTypes['LoginExtensionResponse']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  visibilitySettings?: Resolver<Maybe<ResolversTypes['Visibility']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MassMessagingResolvers<ContextType = any, ParentType extends ResolversParentTypes['MassMessaging'] = ResolversParentTypes['MassMessaging']> = {
  activeSub?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  excludeFans?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  neverChatBefore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MassMessagingMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['MassMessagingMessage'] = ResolversParentTypes['MassMessagingMessage']> = {
  fallbackName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  massMess?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  media?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MassMessagingMessageForMessagingResolvers<ContextType = any, ParentType extends ResolversParentTypes['MassMessagingMessageForMessaging'] = ResolversParentTypes['MassMessagingMessageForMessaging']> = {
  fallbackName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  media?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MassMessagingMessageResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MassMessagingMessageResponse'] = ResolversParentTypes['MassMessagingMessageResponse']> = {
  massMessage?: Resolver<Maybe<ResolversTypes['MassMessagingMessage']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MassMessagingResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MassMessagingResponse'] = ResolversParentTypes['MassMessagingResponse']> = {
  massMessaging?: Resolver<Maybe<ResolversTypes['MassMessaging']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MassMessagingWithMessagesResolvers<ContextType = any, ParentType extends ResolversParentTypes['MassMessagingWithMessages'] = ResolversParentTypes['MassMessagingWithMessages']> = {
  activeSub?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  excludeFans?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  massMessages?: Resolver<Maybe<Array<Maybe<ResolversTypes['MassMessagingMessageForMessaging']>>>, ParentType, ContextType>;
  neverChatBefore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MassMessagingWithMessagesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MassMessagingWithMessagesResponse'] = ResolversParentTypes['MassMessagingWithMessagesResponse']> = {
  massMessaging?: Resolver<Maybe<ResolversTypes['MassMessagingWithMessages']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addAUTOProxy?: Resolver<Maybe<ResolversTypes['chooseProxyResponse']>, ParentType, ContextType, Partial<MutationAddAutoProxyArgs>>;
  addCreator?: Resolver<Maybe<ResolversTypes['AddCreatorResponse']>, ParentType, ContextType, Partial<MutationAddCreatorArgs>>;
  addPreferences?: Resolver<Maybe<ResolversTypes['PreferencesForChatterId']>, ParentType, ContextType, Partial<MutationAddPreferencesArgs>>;
  changeAutoFollow?: Resolver<Maybe<ResolversTypes['AutoFollow']>, ParentType, ContextType, Partial<MutationChangeAutoFollowArgs>>;
  changeCreatorAuth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationChangeCreatorAuthArgs>>;
  changeCreatorAuthByExtension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationChangeCreatorAuthByExtensionArgs>>;
  changeCreatorVisibility?: Resolver<Maybe<ResolversTypes['VisibilityChangeResponse']>, ParentType, ContextType, Partial<MutationChangeCreatorVisibilityArgs>>;
  changeDisplayColor?: Resolver<Maybe<ResolversTypes['DisplayColorResponse']>, ParentType, ContextType, RequireFields<MutationChangeDisplayColorArgs, 'input'>>;
  changeDisplaySettings?: Resolver<Maybe<ResolversTypes['DisplaySettingsResponse']>, ParentType, ContextType, Partial<MutationChangeDisplaySettingsArgs>>;
  changeExpiringFans?: Resolver<Maybe<ResolversTypes['ExpiringFansResponse']>, ParentType, ContextType, Partial<MutationChangeExpiringFansArgs>>;
  changeExpiringFansMessage?: Resolver<Maybe<ResolversTypes['ExpiringFansMessageResponse']>, ParentType, ContextType, RequireFields<MutationChangeExpiringFansMessageArgs, 'input'>>;
  changeFanNumbering?: Resolver<Maybe<ResolversTypes['FanNumbering']>, ParentType, ContextType, Partial<MutationChangeFanNumberingArgs>>;
  changeLicense?: Resolver<Maybe<ResolversTypes['CreatorResponse']>, ParentType, ContextType, Partial<MutationChangeLicenseArgs>>;
  changeMassMessage?: Resolver<Maybe<ResolversTypes['MassMessagingMessageResponse']>, ParentType, ContextType, Partial<MutationChangeMassMessageArgs>>;
  changeMassMessaging?: Resolver<Maybe<ResolversTypes['MassMessagingResponse']>, ParentType, ContextType, Partial<MutationChangeMassMessagingArgs>>;
  changePPVFollow?: Resolver<Maybe<ResolversTypes['changePPVFollow']>, ParentType, ContextType, Partial<MutationChangePpvFollowArgs>>;
  changePPVMessage?: Resolver<Maybe<ResolversTypes['PPVMessageResponse']>, ParentType, ContextType, Partial<MutationChangePpvMessageArgs>>;
  changePassword?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'input'>>;
  changePromotionReactivator?: Resolver<Maybe<ResolversTypes['PromotionReactivator']>, ParentType, ContextType, Partial<MutationChangePromotionReactivatorArgs>>;
  changeScript?: Resolver<Maybe<ResolversTypes['ScriptResponse']>, ParentType, ContextType, Partial<MutationChangeScriptArgs>>;
  changeScriptFolder?: Resolver<Maybe<ResolversTypes['ScriptFolderResponse']>, ParentType, ContextType, Partial<MutationChangeScriptFolderArgs>>;
  changeWelcomeMessage?: Resolver<Maybe<ResolversTypes['WelcomeMessageResponse']>, ParentType, ContextType, RequireFields<MutationChangeWelcomeMessageArgs, 'input'>>;
  changeWelcomeSettings?: Resolver<Maybe<ResolversTypes['WelcomeSettingsResponse']>, ParentType, ContextType, Partial<MutationChangeWelcomeSettingsArgs>>;
  chooseAUTOProxy?: Resolver<Maybe<ResolversTypes['chooseProxyResponse']>, ParentType, ContextType, Partial<MutationChooseAutoProxyArgs>>;
  chooseHTTPProxy?: Resolver<Maybe<ResolversTypes['chooseProxyResponse']>, ParentType, ContextType, Partial<MutationChooseHttpProxyArgs>>;
  chooseNONEProxy?: Resolver<Maybe<ResolversTypes['chooseProxyResponse']>, ParentType, ContextType, RequireFields<MutationChooseNoneProxyArgs, 'creatorId'>>;
  createDisplayColor?: Resolver<Maybe<ResolversTypes['DisplayColorResponse']>, ParentType, ContextType, RequireFields<MutationCreateDisplayColorArgs, 'input'>>;
  createExpiringFansMessage?: Resolver<Maybe<ResolversTypes['ExpiringFansMessageResponse']>, ParentType, ContextType, RequireFields<MutationCreateExpiringFansMessageArgs, 'input'>>;
  createMassMessage?: Resolver<Maybe<ResolversTypes['MassMessagingMessageResponse']>, ParentType, ContextType, Partial<MutationCreateMassMessageArgs>>;
  createMassMessaging?: Resolver<Maybe<ResolversTypes['MassMessagingWithMessagesResponse']>, ParentType, ContextType, Partial<MutationCreateMassMessagingArgs>>;
  createPPVMessage?: Resolver<Maybe<ResolversTypes['PPVMessageResponse']>, ParentType, ContextType, Partial<MutationCreatePpvMessageArgs>>;
  createScript?: Resolver<Maybe<ResolversTypes['ScriptResponse']>, ParentType, ContextType, Partial<MutationCreateScriptArgs>>;
  createScriptFolder?: Resolver<Maybe<ResolversTypes['ScriptFolderResponse']>, ParentType, ContextType, Partial<MutationCreateScriptFolderArgs>>;
  createWelcomeMessage?: Resolver<Maybe<ResolversTypes['WelcomeMessageResponse']>, ParentType, ContextType, RequireFields<MutationCreateWelcomeMessageArgs, 'input'>>;
  deleteAUTOProxy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationDeleteAutoProxyArgs>>;
  deleteCreator?: Resolver<Maybe<ResolversTypes['CreatorDeleteResponse']>, ParentType, ContextType, Partial<MutationDeleteCreatorArgs>>;
  deleteDisplayColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationDeleteDisplayColorArgs>>;
  deleteExpiringFansMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationDeleteExpiringFansMessageArgs>>;
  deleteMassMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationDeleteMassMessageArgs>>;
  deletePPVMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeletePpvMessageArgs, 'pPVMessageId'>>;
  deleteScript?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteScriptArgs, 'id'>>;
  deleteScriptFolder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationDeleteScriptFolderArgs>>;
  deleteWelcomeMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationDeleteWelcomeMessageArgs>>;
  duplicateMassMessaging?: Resolver<Maybe<ResolversTypes['MassMessagingResponse']>, ParentType, ContextType, Partial<MutationDuplicateMassMessagingArgs>>;
  forgotPassword?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'login'>>;
  login?: Resolver<ResolversTypes['RegisterOrLoginResponse'], ParentType, ContextType, Partial<MutationLoginArgs>>;
  loginExtension?: Resolver<Maybe<ResolversTypes['LoginExtensionResponse']>, ParentType, ContextType, RequireFields<MutationLoginExtensionArgs, 'input'>>;
  register?: Resolver<ResolversTypes['RegisterOrLoginResponse'], ParentType, ContextType, Partial<MutationRegisterArgs>>;
  temporarySendWelcomeMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationTemporarySendWelcomeMessageArgs>>;
};

export type OneChatterInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['OneChatterInfo'] = ResolversParentTypes['OneChatterInfo']> = {
  conversionRate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  keystrokes?: Resolver<Maybe<ResolversTypes['Keystrokes']>, ParentType, ContextType>;
  linkClicks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  messagesRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  newSubs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  newSubsRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  onlineTime?: Resolver<Maybe<ResolversTypes['OnlineTime']>, ParentType, ContextType>;
  openChats?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ppvPurchaseRate?: Resolver<Maybe<ResolversTypes['PpvPurchaseRate']>, ParentType, ContextType>;
  recSubsRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sellingChats?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sentMessages?: Resolver<Maybe<ResolversTypes['SentMessages']>, ParentType, ContextType>;
  textingRation?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tipsRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalSales?: Resolver<Maybe<ResolversTypes['TotalSales']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OnlineTimeResolvers<ContextType = any, ParentType extends ResolversParentTypes['OnlineTime'] = ResolversParentTypes['OnlineTime']> = {
  activeTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  inActiveTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  onlineTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvFollowResolvers<ContextType = any, ParentType extends ResolversParentTypes['PPVFollow'] = ResolversParentTypes['PPVFollow']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  include?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['PPVMessage'] = ResolversParentTypes['PPVMessage']> = {
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  fallbackName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  media?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvMessageResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PPVMessageResponse'] = ResolversParentTypes['PPVMessageResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pPVMessage?: Resolver<Maybe<ResolversTypes['PPVMessage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvTrackingFolderMessagesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PPVTrackingFolderMessagesResponse'] = ResolversParentTypes['PPVTrackingFolderMessagesResponse']> = {
  avgNetPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  bought?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['PpvTrackingMessage']>>>, ParentType, ContextType>;
  netRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  purchaseRate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvTrackingFolderResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PPVTrackingFolderResponse'] = ResolversParentTypes['PPVTrackingFolderResponse']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ppvFolders?: Resolver<Maybe<Array<Maybe<ResolversTypes['PpvFolder']>>>, ParentType, ContextType>;
  purchaseRate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  purchases?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  revenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvTrackingResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PPVTrackingResponse'] = ResolversParentTypes['PPVTrackingResponse']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  purchaseRate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  purchases?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  revenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvFolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['PpvFolder'] = ResolversParentTypes['PpvFolder']> = {
  avgNetPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  bought?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  netRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ppvId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  purchaseRate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvPurchaseRateResolvers<ContextType = any, ParentType extends ResolversParentTypes['PpvPurchaseRate'] = ResolversParentTypes['PpvPurchaseRate']> = {
  chart?: Resolver<Maybe<Array<Maybe<ResolversTypes['ppvPurchaseRateChart']>>>, ParentType, ContextType>;
  percent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvTrackingMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['PpvTrackingMessage'] = ResolversParentTypes['PpvTrackingMessage']> = {
  messageId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  purchased?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sentAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Preferences'] = ResolversParentTypes['Preferences']> = {
  subscriberId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferencesForChatterIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['PreferencesForChatterId'] = ResolversParentTypes['PreferencesForChatterId']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferences?: Resolver<Maybe<Array<Maybe<ResolversTypes['Preferences']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PromotionReactivatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['PromotionReactivator'] = ResolversParentTypes['PromotionReactivator']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  period?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProxyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Proxy'] = ResolversParentTypes['Proxy']> = {
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creatorId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  host?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  port?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  proxyType?: Resolver<ResolversTypes['ProxyType'], ParentType, ContextType>;
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProxyForCreatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProxyForCreator'] = ResolversParentTypes['ProxyForCreator']> = {
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  host?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  port?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  proxyType?: Resolver<ResolversTypes['ProxyType'], ParentType, ContextType>;
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllDisplayColors?: Resolver<Maybe<Array<Maybe<ResolversTypes['DisplayColor']>>>, ParentType, ContextType, RequireFields<QueryGetAllDisplayColorsArgs, 'creatorId'>>;
  getAllExpiringFansMessages?: Resolver<Maybe<Array<Maybe<ResolversTypes['ExpiringFansMessage']>>>, ParentType, ContextType, RequireFields<QueryGetAllExpiringFansMessagesArgs, 'creatorId'>>;
  getAllMassMessaging?: Resolver<Maybe<Array<Maybe<ResolversTypes['MassMessagingWithMessages']>>>, ParentType, ContextType, Partial<QueryGetAllMassMessagingArgs>>;
  getAllMessages?: Resolver<Maybe<Array<Maybe<ResolversTypes['MassMessagingMessage']>>>, ParentType, ContextType, Partial<QueryGetAllMessagesArgs>>;
  getAllPPVMessage?: Resolver<Maybe<Array<Maybe<ResolversTypes['PPVMessage']>>>, ParentType, ContextType, Partial<QueryGetAllPpvMessageArgs>>;
  getAllWelcomeMessage?: Resolver<Maybe<Array<Maybe<ResolversTypes['WelcomeMessage']>>>, ParentType, ContextType, RequireFields<QueryGetAllWelcomeMessageArgs, 'creatorId'>>;
  getAutoFollow?: Resolver<Maybe<ResolversTypes['AutoFollow']>, ParentType, ContextType, Partial<QueryGetAutoFollowArgs>>;
  getAvailableCountries?: Resolver<Maybe<Array<Maybe<ResolversTypes['CountryMap']>>>, ParentType, ContextType>;
  getChattersTracking?: Resolver<Maybe<ResolversTypes['ChatterTracking']>, ParentType, ContextType, Partial<QueryGetChattersTrackingArgs>>;
  getCreatorAuth?: Resolver<Maybe<ResolversTypes['CreatorAuth']>, ParentType, ContextType, Partial<QueryGetCreatorAuthArgs>>;
  getCreatorScriptFolders?: Resolver<Maybe<Array<Maybe<ResolversTypes['ScriptFoldersWithScripts']>>>, ParentType, ContextType, Partial<QueryGetCreatorScriptFoldersArgs>>;
  getCreatorStatistic?: Resolver<Maybe<ResolversTypes['Statistic']>, ParentType, ContextType, Partial<QueryGetCreatorStatisticArgs>>;
  getCreatorVisibility?: Resolver<Maybe<ResolversTypes['VisibilityChangeResponse']>, ParentType, ContextType, RequireFields<QueryGetCreatorVisibilityArgs, 'creatorId'>>;
  getDetailedStatistic?: Resolver<Maybe<Array<Maybe<ResolversTypes['DetailedStatisticResponse']>>>, ParentType, ContextType, Partial<QueryGetDetailedStatisticArgs>>;
  getDisplaySettings?: Resolver<Maybe<ResolversTypes['DisplaySettings']>, ParentType, ContextType, Partial<QueryGetDisplaySettingsArgs>>;
  getExpiringFans?: Resolver<Maybe<ResolversTypes['ExpiringFans']>, ParentType, ContextType, Partial<QueryGetExpiringFansArgs>>;
  getFanNumbering?: Resolver<Maybe<ResolversTypes['FanNumbering']>, ParentType, ContextType, Partial<QueryGetFanNumberingArgs>>;
  getOneChatterTracking?: Resolver<Maybe<ResolversTypes['OneChatterInfo']>, ParentType, ContextType, Partial<QueryGetOneChatterTrackingArgs>>;
  getOneDisplayColor?: Resolver<Maybe<ResolversTypes['DisplayColor']>, ParentType, ContextType, RequireFields<QueryGetOneDisplayColorArgs, 'displayColorId'>>;
  getOneExpiringFansMessage?: Resolver<Maybe<ResolversTypes['ExpiringFansMessage']>, ParentType, ContextType, RequireFields<QueryGetOneExpiringFansMessageArgs, 'expiringFansMessageId'>>;
  getOneMassMessage?: Resolver<Maybe<ResolversTypes['MassMessagingMessage']>, ParentType, ContextType, Partial<QueryGetOneMassMessageArgs>>;
  getOneMassMessaging?: Resolver<Maybe<ResolversTypes['MassMessaging']>, ParentType, ContextType, Partial<QueryGetOneMassMessagingArgs>>;
  getOnePPVMessage?: Resolver<Maybe<ResolversTypes['PPVMessage']>, ParentType, ContextType, RequireFields<QueryGetOnePpvMessageArgs, 'pPVMessageId'>>;
  getOneWelcomeMessage?: Resolver<Maybe<ResolversTypes['WelcomeMessage']>, ParentType, ContextType, RequireFields<QueryGetOneWelcomeMessageArgs, 'welcomeMessageId'>>;
  getOverallDetailedComparison?: Resolver<Maybe<Array<Maybe<ResolversTypes['GetOverallDetailedComparisonResponse']>>>, ParentType, ContextType, Partial<QueryGetOverallDetailedComparisonArgs>>;
  getOverallStatistic?: Resolver<Maybe<ResolversTypes['GetOverallStatisticResponse']>, ParentType, ContextType, Partial<QueryGetOverallStatisticArgs>>;
  getPPVFollow?: Resolver<Maybe<ResolversTypes['PPVFollow']>, ParentType, ContextType, RequireFields<QueryGetPpvFollowArgs, 'creatorId'>>;
  getPPVTracking?: Resolver<Maybe<Array<Maybe<ResolversTypes['PPVTrackingResponse']>>>, ParentType, ContextType, Partial<QueryGetPpvTrackingArgs>>;
  getPPVTrackingFolder?: Resolver<Maybe<ResolversTypes['PPVTrackingFolderResponse']>, ParentType, ContextType, Partial<QueryGetPpvTrackingFolderArgs>>;
  getPPVTrackingFolderMessages?: Resolver<Maybe<ResolversTypes['PPVTrackingFolderMessagesResponse']>, ParentType, ContextType, Partial<QueryGetPpvTrackingFolderMessagesArgs>>;
  getPreferencesByChatterIdExtension?: Resolver<Maybe<ResolversTypes['GetPreferencesByChatterIdExtensionResponse']>, ParentType, ContextType, Partial<QueryGetPreferencesByChatterIdExtensionArgs>>;
  getPromotionReactivator?: Resolver<Maybe<ResolversTypes['PromotionReactivator']>, ParentType, ContextType, Partial<QueryGetPromotionReactivatorArgs>>;
  getScriptById?: Resolver<Maybe<ResolversTypes['Script']>, ParentType, ContextType, RequireFields<QueryGetScriptByIdArgs, 'id'>>;
  getScriptFolderById?: Resolver<Maybe<ResolversTypes['ScriptFolder']>, ParentType, ContextType, Partial<QueryGetScriptFolderByIdArgs>>;
  getUserByToken?: Resolver<Maybe<ResolversTypes['GetUserByTokenResponse']>, ParentType, ContextType>;
  getUserCreatorsProxy?: Resolver<Maybe<Array<Maybe<ResolversTypes['CreatorWithProxy']>>>, ParentType, ContextType>;
  getVisibilitySettingByTokenExtension?: Resolver<Maybe<ResolversTypes['VisibilitySettingByExtension']>, ParentType, ContextType, Partial<QueryGetVisibilitySettingByTokenExtensionArgs>>;
  getWelcomeSettings?: Resolver<Maybe<ResolversTypes['WelcomeSettings']>, ParentType, ContextType, Partial<QueryGetWelcomeSettingsArgs>>;
  scrapeAvatarAndNameForCreator?: Resolver<Maybe<ResolversTypes['ResponseAvatarAndName']>, ParentType, ContextType, RequireFields<QueryScrapeAvatarAndNameForCreatorArgs, 'url'>>;
  scrapePublicOnlyFansPhoto?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryScrapePublicOnlyFansPhotoArgs, 'url'>>;
  scraperAPIAvatarAndNameForCreator?: Resolver<Maybe<ResolversTypes['ResponseAvatarAndName']>, ParentType, ContextType, RequireFields<QueryScraperApiAvatarAndNameForCreatorArgs, 'id'>>;
};

export type ReceivedHistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReceivedHistory'] = ResolversParentTypes['ReceivedHistory']> = {
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  received?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterOrLoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterOrLoginResponse'] = ResolversParentTypes['RegisterOrLoginResponse']> = {
  creators?: Resolver<Maybe<Array<Maybe<ResolversTypes['CreatorForUser']>>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserDTO']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResetPasswordResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResetPassword'] = ResolversParentTypes['ResetPassword']> = {
  expire?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resetCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResponseAvatarAndNameResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResponseAvatarAndName'] = ResolversParentTypes['ResponseAvatarAndName']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RevenueChartResolvers<ContextType = any, ParentType extends ResolversParentTypes['RevenueChart'] = ResolversParentTypes['RevenueChart']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  receivedHistory?: Resolver<Maybe<Array<Maybe<ResolversTypes['ReceivedHistory']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptResolvers<ContextType = any, ParentType extends ResolversParentTypes['Script'] = ResolversParentTypes['Script']> = {
  customName?: Resolver<ResolversTypes['NameEnum'], ParentType, ContextType>;
  fallbackName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fanName?: Resolver<ResolversTypes['NameEnum'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  scriptFolder?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptFolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScriptFolder'] = ResolversParentTypes['ScriptFolder']> = {
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  folderName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptFolderResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScriptFolderResponse'] = ResolversParentTypes['ScriptFolderResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scriptFolder?: Resolver<Maybe<ResolversTypes['ScriptFolder']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptFolderWithScriptResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScriptFolderWithScript'] = ResolversParentTypes['ScriptFolderWithScript']> = {
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  folderName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  scripts?: Resolver<Maybe<Array<Maybe<ResolversTypes['ScriptForFolder']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptFoldersWithScriptsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScriptFoldersWithScripts'] = ResolversParentTypes['ScriptFoldersWithScripts']> = {
  scriptFolders?: Resolver<Maybe<ResolversTypes['ScriptFolderWithScript']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptForFolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScriptForFolder'] = ResolversParentTypes['ScriptForFolder']> = {
  fallbackName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScriptResponse'] = ResolversParentTypes['ScriptResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  script?: Resolver<Maybe<ResolversTypes['Script']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SentMessagesResolvers<ContextType = any, ParentType extends ResolversParentTypes['SentMessages'] = ResolversParentTypes['SentMessages']> = {
  chart?: Resolver<Maybe<Array<Maybe<ResolversTypes['sentMessagesChart']>>>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatisticResolvers<ContextType = any, ParentType extends ResolversParentTypes['Statistic'] = ResolversParentTypes['Statistic']> = {
  bestDay?: Resolver<Maybe<Array<Maybe<ResolversTypes['Best']>>>, ParentType, ContextType>;
  bestHour?: Resolver<Maybe<Array<Maybe<ResolversTypes['Best']>>>, ParentType, ContextType>;
  composition?: Resolver<Maybe<Array<Maybe<ResolversTypes['Composition']>>>, ParentType, ContextType>;
  subscription?: Resolver<Maybe<ResolversTypes['StatisticSection']>, ParentType, ContextType>;
  topFans?: Resolver<Maybe<Array<Maybe<ResolversTypes['TopFan']>>>, ParentType, ContextType>;
  turnover?: Resolver<Maybe<ResolversTypes['StatisticSection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatisticSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['StatisticSection'] = ResolversParentTypes['StatisticSection']> = {
  chart?: Resolver<Maybe<Array<Maybe<ResolversTypes['Chart']>>>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopFanResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopFan'] = ResolversParentTypes['TopFan']> = {
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TotalSalesResolvers<ContextType = any, ParentType extends ResolversParentTypes['TotalSales'] = ResolversParentTypes['TotalSales']> = {
  chart?: Resolver<Maybe<Array<Maybe<ResolversTypes['totalSalesChart']>>>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  passwordHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resetPassword?: Resolver<Maybe<ResolversTypes['ResetPassword']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDtoResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserDTO'] = ResolversParentTypes['UserDTO']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisibilityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Visibility'] = ResolversParentTypes['Visibility']> = {
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  showFanDetails?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  showFanSpending?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  showGlobalInfo?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  showScripts?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisibilityChangeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['VisibilityChangeResponse'] = ResolversParentTypes['VisibilityChangeResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  visibility?: Resolver<Maybe<ResolversTypes['Visibility']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisibilitySettingByExtensionResolvers<ContextType = any, ParentType extends ResolversParentTypes['VisibilitySettingByExtension'] = ResolversParentTypes['VisibilitySettingByExtension']> = {
  user_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  visibilitySetting?: Resolver<Maybe<ResolversTypes['Visibility']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WelcomeMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['WelcomeMessage'] = ResolversParentTypes['WelcomeMessage']> = {
  fallbackName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  media?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  welcomeSettings?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WelcomeMessageResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WelcomeMessageResponse'] = ResolversParentTypes['WelcomeMessageResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  welcomeMessage?: Resolver<Maybe<ResolversTypes['WelcomeMessage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WelcomeSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WelcomeSettings'] = ResolversParentTypes['WelcomeSettings']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WelcomeSettingsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WelcomeSettingsResponse'] = ResolversParentTypes['WelcomeSettingsResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  welcomeSettings?: Resolver<Maybe<ResolversTypes['WelcomeSettings']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangePpvFollowResolvers<ContextType = any, ParentType extends ResolversParentTypes['changePPVFollow'] = ResolversParentTypes['changePPVFollow']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pPVFollow?: Resolver<Maybe<ResolversTypes['PPVFollow']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChooseProxyResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['chooseProxyResponse'] = ResolversParentTypes['chooseProxyResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  proxy?: Resolver<Maybe<ResolversTypes['Proxy']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PpvPurchaseRateChartResolvers<ContextType = any, ParentType extends ResolversParentTypes['ppvPurchaseRateChart'] = ResolversParentTypes['ppvPurchaseRateChart']> = {
  boughtPPV?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  sendPPV?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SentKeystrokesChartResolvers<ContextType = any, ParentType extends ResolversParentTypes['sentKeystrokesChart'] = ResolversParentTypes['sentKeystrokesChart']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SentMessagesChartResolvers<ContextType = any, ParentType extends ResolversParentTypes['sentMessagesChart'] = ResolversParentTypes['sentMessagesChart']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TotalSalesChartResolvers<ContextType = any, ParentType extends ResolversParentTypes['totalSalesChart'] = ResolversParentTypes['totalSalesChart']> = {
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ppvRevenue?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tipsRevenue?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AddCreatorResponse?: AddCreatorResponseResolvers<ContextType>;
  AmountStats?: AmountStatsResolvers<ContextType>;
  AutoFollow?: AutoFollowResolvers<ContextType>;
  Best?: BestResolvers<ContextType>;
  Chart?: ChartResolvers<ContextType>;
  ChatterDetailed?: ChatterDetailedResolvers<ContextType>;
  ChatterShort?: ChatterShortResolvers<ContextType>;
  ChatterTracking?: ChatterTrackingResolvers<ContextType>;
  Composition?: CompositionResolvers<ContextType>;
  CountChartStatistic?: CountChartStatisticResolvers<ContextType>;
  CountryMap?: CountryMapResolvers<ContextType>;
  Creator?: CreatorResolvers<ContextType>;
  CreatorAuth?: CreatorAuthResolvers<ContextType>;
  CreatorDeleteResponse?: CreatorDeleteResponseResolvers<ContextType>;
  CreatorForAddCreatorResponse?: CreatorForAddCreatorResponseResolvers<ContextType>;
  CreatorForUser?: CreatorForUserResolvers<ContextType>;
  CreatorResponse?: CreatorResponseResolvers<ContextType>;
  CreatorWithProxy?: CreatorWithProxyResolvers<ContextType>;
  CreatorWithoutPreferences?: CreatorWithoutPreferencesResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DetailedStatisticResponse?: DetailedStatisticResponseResolvers<ContextType>;
  DisplayColor?: DisplayColorResolvers<ContextType>;
  DisplayColorResponse?: DisplayColorResponseResolvers<ContextType>;
  DisplaySettings?: DisplaySettingsResolvers<ContextType>;
  DisplaySettingsResponse?: DisplaySettingsResponseResolvers<ContextType>;
  ExpiringFans?: ExpiringFansResolvers<ContextType>;
  ExpiringFansMessage?: ExpiringFansMessageResolvers<ContextType>;
  ExpiringFansMessageResponse?: ExpiringFansMessageResponseResolvers<ContextType>;
  ExpiringFansResponse?: ExpiringFansResponseResolvers<ContextType>;
  FanNumbering?: FanNumberingResolvers<ContextType>;
  GetOverallDetailedComparisonResponse?: GetOverallDetailedComparisonResponseResolvers<ContextType>;
  GetOverallStatisticResponse?: GetOverallStatisticResponseResolvers<ContextType>;
  GetPreferencesByChatterIdExtensionResponse?: GetPreferencesByChatterIdExtensionResponseResolvers<ContextType>;
  GetUserByTokenResponse?: GetUserByTokenResponseResolvers<ContextType>;
  IncomeInfo?: IncomeInfoResolvers<ContextType>;
  Keystrokes?: KeystrokesResolvers<ContextType>;
  LoginExtensionResponse?: LoginExtensionResponseResolvers<ContextType>;
  MassMessaging?: MassMessagingResolvers<ContextType>;
  MassMessagingMessage?: MassMessagingMessageResolvers<ContextType>;
  MassMessagingMessageForMessaging?: MassMessagingMessageForMessagingResolvers<ContextType>;
  MassMessagingMessageResponse?: MassMessagingMessageResponseResolvers<ContextType>;
  MassMessagingResponse?: MassMessagingResponseResolvers<ContextType>;
  MassMessagingWithMessages?: MassMessagingWithMessagesResolvers<ContextType>;
  MassMessagingWithMessagesResponse?: MassMessagingWithMessagesResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OneChatterInfo?: OneChatterInfoResolvers<ContextType>;
  OnlineTime?: OnlineTimeResolvers<ContextType>;
  PPVFollow?: PpvFollowResolvers<ContextType>;
  PPVMessage?: PpvMessageResolvers<ContextType>;
  PPVMessageResponse?: PpvMessageResponseResolvers<ContextType>;
  PPVTrackingFolderMessagesResponse?: PpvTrackingFolderMessagesResponseResolvers<ContextType>;
  PPVTrackingFolderResponse?: PpvTrackingFolderResponseResolvers<ContextType>;
  PPVTrackingResponse?: PpvTrackingResponseResolvers<ContextType>;
  PpvFolder?: PpvFolderResolvers<ContextType>;
  PpvPurchaseRate?: PpvPurchaseRateResolvers<ContextType>;
  PpvTrackingMessage?: PpvTrackingMessageResolvers<ContextType>;
  Preferences?: PreferencesResolvers<ContextType>;
  PreferencesForChatterId?: PreferencesForChatterIdResolvers<ContextType>;
  PromotionReactivator?: PromotionReactivatorResolvers<ContextType>;
  Proxy?: ProxyResolvers<ContextType>;
  ProxyForCreator?: ProxyForCreatorResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReceivedHistory?: ReceivedHistoryResolvers<ContextType>;
  RegisterOrLoginResponse?: RegisterOrLoginResponseResolvers<ContextType>;
  ResetPassword?: ResetPasswordResolvers<ContextType>;
  ResponseAvatarAndName?: ResponseAvatarAndNameResolvers<ContextType>;
  RevenueChart?: RevenueChartResolvers<ContextType>;
  Script?: ScriptResolvers<ContextType>;
  ScriptFolder?: ScriptFolderResolvers<ContextType>;
  ScriptFolderResponse?: ScriptFolderResponseResolvers<ContextType>;
  ScriptFolderWithScript?: ScriptFolderWithScriptResolvers<ContextType>;
  ScriptFoldersWithScripts?: ScriptFoldersWithScriptsResolvers<ContextType>;
  ScriptForFolder?: ScriptForFolderResolvers<ContextType>;
  ScriptResponse?: ScriptResponseResolvers<ContextType>;
  SentMessages?: SentMessagesResolvers<ContextType>;
  Statistic?: StatisticResolvers<ContextType>;
  StatisticSection?: StatisticSectionResolvers<ContextType>;
  TopFan?: TopFanResolvers<ContextType>;
  TotalSales?: TotalSalesResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserDTO?: UserDtoResolvers<ContextType>;
  Visibility?: VisibilityResolvers<ContextType>;
  VisibilityChangeResponse?: VisibilityChangeResponseResolvers<ContextType>;
  VisibilitySettingByExtension?: VisibilitySettingByExtensionResolvers<ContextType>;
  WelcomeMessage?: WelcomeMessageResolvers<ContextType>;
  WelcomeMessageResponse?: WelcomeMessageResponseResolvers<ContextType>;
  WelcomeSettings?: WelcomeSettingsResolvers<ContextType>;
  WelcomeSettingsResponse?: WelcomeSettingsResponseResolvers<ContextType>;
  changePPVFollow?: ChangePpvFollowResolvers<ContextType>;
  chooseProxyResponse?: ChooseProxyResponseResolvers<ContextType>;
  ppvPurchaseRateChart?: PpvPurchaseRateChartResolvers<ContextType>;
  sentKeystrokesChart?: SentKeystrokesChartResolvers<ContextType>;
  sentMessagesChart?: SentMessagesChartResolvers<ContextType>;
  totalSalesChart?: TotalSalesChartResolvers<ContextType>;
};

