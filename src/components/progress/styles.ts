import { StyleSheet } from "react-native"
import { colors, fontFamily, fontSize } from "@/theme"

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.gray[500],
    marginBottom: 6,
  },
  status: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  value: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.black,
    flex: 1,
  },
  target: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.gray[500],
  },
  percentage: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.blue[500],
  },
  progress: {
    marginTop: 16,
    width: "100%",
    height: 6,
    borderRadius: 6,
    backgroundColor: colors.gray[300],
    overflow: "hidden",
  },
  currentProgress: {
    backgroundColor: colors.blue[500],
    height: 5,
  },
})
