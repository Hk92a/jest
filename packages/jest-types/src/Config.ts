/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {ForegroundColor} from 'chalk';
import type {ReportOptions} from 'istanbul-reports';
import type {Arguments} from 'yargs';
import type {SnapshotFormat} from '@jest/schemas';

type CoverageProvider = 'babel' | 'v8';

type Timers = 'real' | 'fake' | 'modern' | 'legacy';

export type HasteConfig = {
  /** Whether to hash files using SHA-1. */
  computeSha1?: boolean;
  /** The platform to use as the default, e.g. 'ios'. */
  defaultPlatform?: string | null;
  /** Force use of Node's `fs` APIs rather than shelling out to `find` */
  forceNodeFilesystemAPI?: boolean;
  /**
   * Whether to follow symlinks when crawling for files.
   *   This options cannot be used in projects which use watchman.
   *   Projects with `watchman` set to true will error if this option is set to true.
   */
  enableSymlinks?: boolean;
  /** string to a custom implementation of Haste. */
  hasteImplModulePath?: string;
  /** All platforms to target, e.g ['ios', 'android']. */
  platforms?: Array<string>;
  /** Whether to throw on error on module collision. */
  throwOnModuleCollision?: boolean;
  /** Custom HasteMap module */
  hasteMapModulePath?: string;
  /** Whether to retain all files, allowing e.g. search for tests in `node_modules`. */
  retainAllFiles?: boolean;
};

export type CoverageReporterName = keyof ReportOptions;

export type CoverageReporterWithOptions<K = CoverageReporterName> =
  K extends CoverageReporterName
    ? ReportOptions[K] extends never
      ? never
      : [K, Partial<ReportOptions[K]>]
    : never;

export type CoverageReporters = Array<
  CoverageReporterName | CoverageReporterWithOptions
>;

export type ReporterConfig = [string, Record<string, unknown>];
export type TransformerConfig = [string, Record<string, unknown>];

export interface ConfigGlobals {
  [K: string]: unknown;
}

export type DefaultOptions = {
  automock: boolean;
  bail: number;
  cache: boolean;
  cacheDirectory: string;
  changedFilesWithAncestor: boolean;
  ci: boolean;
  clearMocks: boolean;
  collectCoverage: boolean;
  coveragePathIgnorePatterns: Array<string>;
  coverageReporters: Array<CoverageReporterName>;
  coverageProvider: CoverageProvider;
  detectLeaks: boolean;
  detectOpenHandles: boolean;
  errorOnDeprecated: boolean;
  expand: boolean;
  extensionsToTreatAsEsm: Array<string>;
  forceCoverageMatch: Array<string>;
  globals: ConfigGlobals;
  haste: HasteConfig;
  injectGlobals: boolean;
  listTests: boolean;
  maxConcurrency: number;
  maxWorkers: number | string;
  moduleDirectories: Array<string>;
  moduleFileExtensions: Array<string>;
  moduleNameMapper: Record<string, string | Array<string>>;
  modulePathIgnorePatterns: Array<string>;
  noStackTrace: boolean;
  notify: boolean;
  notifyMode: NotifyMode;
  passWithNoTests: boolean;
  prettierPath: string;
  resetMocks: boolean;
  resetModules: boolean;
  restoreMocks: boolean;
  roots: Array<string>;
  runTestsByPath: boolean;
  runner: string;
  setupFiles: Array<string>;
  setupFilesAfterEnv: Array<string>;
  skipFilter: boolean;
  slowTestThreshold: number;
  snapshotSerializers: Array<string>;
  testEnvironment: string;
  testEnvironmentOptions: Record<string, unknown>;
  testFailureExitCode: string | number;
  testLocationInResults: boolean;
  testMatch: Array<string>;
  testPathIgnorePatterns: Array<string>;
  testRegex: Array<string>;
  testRunner: string;
  testSequencer: string;
  testURL: string;
  timers: Timers;
  transformIgnorePatterns: Array<string>;
  useStderr: boolean;
  watch: boolean;
  watchPathIgnorePatterns: Array<string>;
  watchman: boolean;
};

export type DisplayName = {
  name: string;
  color: typeof ForegroundColor;
};

export type InitialOptionsWithRootDir = InitialOptions &
  Required<Pick<InitialOptions, 'rootDir'>>;

export type InitialProjectOptions = Pick<
  InitialOptions & {cwd?: string},
  keyof ProjectConfig
>;

export type InitialOptions = Partial<{
  automock: boolean;
  bail: boolean | number;
  cache: boolean;
  cacheDirectory: string;
  ci: boolean;
  clearMocks: boolean;
  changedFilesWithAncestor: boolean;
  changedSince: string;
  collectCoverage: boolean;
  collectCoverageFrom: Array<string>;
  collectCoverageOnlyFrom: {
    [key: string]: boolean;
  };
  coverageDirectory: string;
  coveragePathIgnorePatterns: Array<string>;
  coverageProvider: CoverageProvider;
  coverageReporters: CoverageReporters;
  coverageThreshold: CoverageThreshold;
  dependencyExtractor: string;
  detectLeaks: boolean;
  detectOpenHandles: boolean;
  displayName: string | DisplayName;
  expand: boolean;
  extensionsToTreatAsEsm: Array<string>;
  extraGlobals: Array<string>;
  filter: string;
  findRelatedTests: boolean;
  forceCoverageMatch: Array<string>;
  forceExit: boolean;
  json: boolean;
  globals: ConfigGlobals;
  globalSetup: string | null | undefined;
  globalTeardown: string | null | undefined;
  haste: HasteConfig;
  injectGlobals: boolean;
  reporters: Array<string | ReporterConfig>;
  logHeapUsage: boolean;
  lastCommit: boolean;
  listTests: boolean;
  maxConcurrency: number;
  maxWorkers: number | string;
  moduleDirectories: Array<string>;
  moduleFileExtensions: Array<string>;
  moduleLoader: string;
  moduleNameMapper: {
    [key: string]: string | Array<string>;
  };
  modulePathIgnorePatterns: Array<string>;
  modulePaths: Array<string>;
  name: string;
  noStackTrace: boolean;
  notify: boolean;
  notifyMode: string;
  onlyChanged: boolean;
  onlyFailures: boolean;
  outputFile: string;
  passWithNoTests: boolean;
  /**
   * @deprecated Use `transformIgnorePatterns` options instead.
   */
  preprocessorIgnorePatterns: Array<string>;
  preset: string | null | undefined;
  prettierPath: string | null | undefined;
  projects: Array<string | InitialProjectOptions>;
  replname: string | null | undefined;
  resetMocks: boolean;
  resetModules: boolean;
  resolver: string | null | undefined;
  restoreMocks: boolean;
  rootDir: string;
  roots: Array<string>;
  runner: string;
  runTestsByPath: boolean;
  /**
   * @deprecated Use `transform` options instead.
   */
  scriptPreprocessor: string;
  setupFiles: Array<string>;
  /**
   * @deprecated Use `setupFilesAfterEnv` options instead.
   */
  setupTestFrameworkScriptFile: string;
  setupFilesAfterEnv: Array<string>;
  silent: boolean;
  skipFilter: boolean;
  skipNodeResolution: boolean;
  slowTestThreshold: number;
  snapshotResolver: string;
  snapshotSerializers: Array<string>;
  snapshotFormat: SnapshotFormat;
  errorOnDeprecated: boolean;
  testEnvironment: string;
  testEnvironmentOptions: Record<string, unknown>;
  testFailureExitCode: string | number;
  testLocationInResults: boolean;
  testMatch: Array<string>;
  testNamePattern: string;
  /**
   * @deprecated Use `roots` options instead.
   */
  testPathDirs: Array<string>;
  testPathIgnorePatterns: Array<string>;
  testRegex: string | Array<string>;
  testResultsProcessor: string;
  testRunner: string;
  testSequencer: string;
  testURL: string;
  testTimeout: number;
  timers: Timers;
  transform: {
    [regex: string]: string | TransformerConfig;
  };
  transformIgnorePatterns: Array<string>;
  watchPathIgnorePatterns: Array<string>;
  unmockedModulePathPatterns: Array<string>;
  updateSnapshot: boolean;
  useStderr: boolean;
  verbose?: boolean;
  watch: boolean;
  watchAll: boolean;
  watchman: boolean;
  watchPlugins: Array<string | [string, Record<string, unknown>]>;
}>;

export type SnapshotUpdateState = 'all' | 'new' | 'none';

type NotifyMode =
  | 'always'
  | 'failure'
  | 'success'
  | 'change'
  | 'success-change'
  | 'failure-change';

export type CoverageThresholdValue = {
  branches?: number;
  functions?: number;
  lines?: number;
  statements?: number;
};

type CoverageThreshold = {
  [path: string]: CoverageThresholdValue;
  global: CoverageThresholdValue;
};

export type GlobalConfig = {
  bail: number;
  changedSince?: string;
  changedFilesWithAncestor: boolean;
  ci: boolean;
  collectCoverage: boolean;
  collectCoverageFrom: Array<string>;
  collectCoverageOnlyFrom?: {
    [key: string]: boolean;
  };
  coverageDirectory: string;
  coveragePathIgnorePatterns?: Array<string>;
  coverageProvider: CoverageProvider;
  coverageReporters: CoverageReporters;
  coverageThreshold?: CoverageThreshold;
  detectLeaks: boolean;
  detectOpenHandles: boolean;
  expand: boolean;
  filter?: string;
  findRelatedTests: boolean;
  forceExit: boolean;
  json: boolean;
  globalSetup?: string;
  globalTeardown?: string;
  lastCommit: boolean;
  logHeapUsage: boolean;
  listTests: boolean;
  maxConcurrency: number;
  maxWorkers: number;
  noStackTrace: boolean;
  nonFlagArgs: Array<string>;
  noSCM?: boolean;
  notify: boolean;
  notifyMode: NotifyMode;
  outputFile?: string;
  onlyChanged: boolean;
  onlyFailures: boolean;
  passWithNoTests: boolean;
  projects: Array<string>;
  replname?: string;
  reporters?: Array<string | ReporterConfig>;
  runTestsByPath: boolean;
  rootDir: string;
  silent?: boolean;
  skipFilter: boolean;
  snapshotFormat: SnapshotFormat;
  errorOnDeprecated: boolean;
  testFailureExitCode: number;
  testNamePattern?: string;
  testPathPattern: string;
  testResultsProcessor?: string;
  testSequencer: string;
  testTimeout?: number;
  updateSnapshot: SnapshotUpdateState;
  useStderr: boolean;
  verbose?: boolean;
  watch: boolean;
  watchAll: boolean;
  watchman: boolean;
  watchPlugins?: Array<{
    path: string;
    config: Record<string, unknown>;
  }> | null;
};

export type ProjectConfig = {
  automock: boolean;
  cache: boolean;
  cacheDirectory: string;
  clearMocks: boolean;
  coveragePathIgnorePatterns: Array<string>;
  cwd: string;
  dependencyExtractor?: string;
  detectLeaks: boolean;
  detectOpenHandles: boolean;
  displayName?: DisplayName;
  errorOnDeprecated: boolean;
  extensionsToTreatAsEsm: Array<string>;
  extraGlobals: Array<keyof typeof globalThis>;
  filter?: string;
  forceCoverageMatch: Array<string>;
  globalSetup?: string;
  globalTeardown?: string;
  globals: ConfigGlobals;
  haste: HasteConfig;
  injectGlobals: boolean;
  moduleDirectories: Array<string>;
  moduleFileExtensions: Array<string>;
  moduleLoader?: string;
  moduleNameMapper: Array<[string, string]>;
  modulePathIgnorePatterns: Array<string>;
  modulePaths?: Array<string>;
  name: string;
  prettierPath: string;
  resetMocks: boolean;
  resetModules: boolean;
  resolver?: string;
  restoreMocks: boolean;
  rootDir: string;
  roots: Array<string>;
  runner: string;
  setupFiles: Array<string>;
  setupFilesAfterEnv: Array<string>;
  skipFilter: boolean;
  skipNodeResolution?: boolean;
  slowTestThreshold: number;
  snapshotResolver?: string;
  snapshotSerializers: Array<string>;
  snapshotFormat: SnapshotFormat;
  testEnvironment: string;
  testEnvironmentOptions: Record<string, unknown>;
  testMatch: Array<string>;
  testLocationInResults: boolean;
  testPathIgnorePatterns: Array<string>;
  testRegex: Array<string | RegExp>;
  testRunner: string;
  testURL: string;
  timers: Timers;
  transform: Array<[string, string, Record<string, unknown>]>;
  transformIgnorePatterns: Array<string>;
  watchPathIgnorePatterns: Array<string>;
  unmockedModulePathPatterns?: Array<string>;
};

export type Argv = Arguments<
  Partial<{
    all: boolean;
    automock: boolean;
    bail: boolean | number;
    cache: boolean;
    cacheDirectory: string;
    changedFilesWithAncestor: boolean;
    changedSince: string;
    ci: boolean;
    clearCache: boolean;
    clearMocks: boolean;
    collectCoverage: boolean;
    collectCoverageFrom: string;
    collectCoverageOnlyFrom: Array<string>;
    color: boolean;
    colors: boolean;
    config: string;
    coverage: boolean;
    coverageDirectory: string;
    coveragePathIgnorePatterns: Array<string>;
    coverageReporters: Array<string>;
    coverageThreshold: string;
    debug: boolean;
    env: string;
    expand: boolean;
    findRelatedTests: boolean;
    forceExit: boolean;
    globals: string;
    globalSetup: string | null | undefined;
    globalTeardown: string | null | undefined;
    haste: string;
    init: boolean;
    injectGlobals: boolean;
    json: boolean;
    lastCommit: boolean;
    logHeapUsage: boolean;
    maxWorkers: number | string;
    moduleDirectories: Array<string>;
    moduleFileExtensions: Array<string>;
    moduleNameMapper: string;
    modulePathIgnorePatterns: Array<string>;
    modulePaths: Array<string>;
    noStackTrace: boolean;
    notify: boolean;
    notifyMode: string;
    onlyChanged: boolean;
    onlyFailures: boolean;
    outputFile: string;
    preset: string | null | undefined;
    projects: Array<string>;
    prettierPath: string | null | undefined;
    resetMocks: boolean;
    resetModules: boolean;
    resolver: string | null | undefined;
    restoreMocks: boolean;
    rootDir: string;
    roots: Array<string>;
    runInBand: boolean;
    selectProjects: Array<string>;
    setupFiles: Array<string>;
    setupFilesAfterEnv: Array<string>;
    showConfig: boolean;
    silent: boolean;
    snapshotSerializers: Array<string>;
    testEnvironment: string;
    testEnvironmentOptions: string;
    testFailureExitCode: string | null | undefined;
    testMatch: Array<string>;
    testNamePattern: string;
    testPathIgnorePatterns: Array<string>;
    testPathPattern: Array<string>;
    testRegex: string | Array<string>;
    testResultsProcessor: string;
    testRunner: string;
    testSequencer: string;
    testURL: string;
    testTimeout: number | null | undefined;
    timers: string;
    transform: string;
    transformIgnorePatterns: Array<string>;
    unmockedModulePathPatterns: Array<string> | null | undefined;
    updateSnapshot: boolean;
    useStderr: boolean;
    verbose: boolean;
    version: boolean;
    watch: boolean;
    watchAll: boolean;
    watchman: boolean;
    watchPathIgnorePatterns: Array<string>;
  }>
>;
